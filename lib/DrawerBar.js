/**
 * Created by pc on 2016/2/26.\
 * for:找车，找开侧边栏出现manufacturers相关信息
 */
'use strict';
var React = require('react-native');
var {
    AsyncStorage,
    Image,
    StyleSheet,
    AppRegistry,
    Component,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Animated,
    TouchableHighlight,
    Easing,
    PanResponder,
    Dimensions,
    } = React;

var Animated = require('Animated');//Animated加入动画
var DrawerBar=React.createClass({
    _panResponder: {},
    getInitialState: function() {
        return {
           moveX:0,
           tempX:0,
           showDrawer:0,
           width:new Animated.Value(0)
        };
    },
    _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
        return true;
    },

    _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
        return true;
    },
    _handlePanResponderMove: function(e: Object, gestureState: Object) {
        console.log("locationX===>"+e.nativeEvent.locationX);
        this.setState({"tempX":this.state.tempX+gestureState.dx-this.state.moveX});
        this.setState({"moveX":gestureState.dx});
    },
    _handlePanResponderEnd: function(e: Object, gestureState: Object) {
        if(this.state.tempX>25)//超出15个像素就消失
            this.setState({"moveX":0,"tempX":0, showDrawer:0});//消失
    },
    _onShouldBlockNativeResponder:function(e: Object, gestureState: Object){//不阻止原生的js事件
        return false;
    },
    componentDidMount() {
        var timing = Animated.timing;
        //parallel 平行表同步进行 Animated.parallel().map().start();三种属性同时启动
        Animated.parallel(['width'].map(property => {
            return timing(this.state[property], {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            });
        })).start();
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onShouldBlockNativeResponder:this. _onShouldBlockNativeResponder
        });
    },
   openDrawer:function(){
          this.setState({"showDrawer":1});
    },
    closeDrawer:function(){
         this.setState({"showDrawer":0});
    },
    render:function(){
        var parent=this;
          return (
              <View style={styles.container}>
                  {this.props.children}
                  {
                      this.state.showDrawer?[
                          <Animated.View key="animated1"
                              {...parent._panResponder.panHandlers}
                                         style={[{
                             backgroundColor:'red',
                             position:"absolute",
                             right:0,
                             top:0,
                             height:(Dimensions.get('window').height+200),//处理滚动条的问题
                             width:this.state.width.interpolate({
                               inputRange:[0,1],
                               outputRange:[0,this.props.width]
                            })
                         }]}>
                             {this.props.content}
                          </Animated.View>
                      ]:null
                  }
               </View>
          );
    }
})
const styles = StyleSheet.create({
      container:{flex:1}
});
module.exports=DrawerBar;//自定义抽屉功能
