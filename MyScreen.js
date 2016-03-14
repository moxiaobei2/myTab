/**
 * Created by wuxiaoling on 2016/2/26.
 * @des：我的
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    Image,
    PixelRatio,
    Navigator,
    ToolbarAndroid,
    TouchableOpacity,
    View
} from 'react-native';
var MyCollectScreen=require("./MyCollectScreen");//我的收藏页
var _navigator;
var MyScreen=React.createClass({
    getInitialState: function() {
        return {
           collectPressed:0,
            tuanPressed :0,
        };
    },
    RouteMapper: function(route, navigationOperations, onComponentRef) {
        _navigator = navigationOperations;
        if(route.name=="my"){
            return(
                <View style={styles.container}>
                    <View style={[styles.toolbar,styles.item]}>
                        <Text style={styles.toolbar_text}>工具</Text>
                    </View>
                    <View style={[styles.row,styles.white,styles.row_bottom10]} >
                        <View style={[styles.item,styles.flex,styles.item_first]} >
                            <TouchableOpacity style={styles.item} onPress={() => {
                         //此处作按钮的跳转
                          this.setState({collectPressed:!this.state.collectPressed});
                           _navigator.push({name:"myCollect"});
                         }}>
                                <Image source={this.state.collectPressed?require("./img/bth_collect_selected@3x.png"):require("./img/bth_collect@2x.png")}/>
                                <Text>我的收藏</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.item,styles.flex]}>
                            <TouchableOpacity style={styles.item} onPress={() => {
                         //此处作按钮的跳转
                          this.setState({tuanPressed:!this.state.tuanPressed});
                         }}>
                                <Image source={this.state.tuanPressed?require("./img/bth_tuan_selected@2x.png"):require("./img/bth_tuan@2x.png")}/>
                                <Text>我的团购</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={[styles.white,styles.row_bottom1]}>
                        <TouchableOpacity  onPress={() => {
                         }}>
                            <View style={[styles.navList]}>
                                <View style={[styles.flex,{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingLeft:10}]}>
                                    <Image  style={[styles.imageSize]} source={require("./img/icon_city@2x.png")}/>
                                    <Text style={{marginLeft:10}}>选择城市</Text>
                                </View>
                                <View style={[styles.flex,styles.floatRight]}>
                                    <Text>广州</Text>
                                    <Image  style={styles.imageSize} source={require("./img/arrow_gray_right@2x.png")}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.white,styles.row_bottom10]}>
                        <TouchableOpacity  onPress={() => {
                         }}>
                            <View style={[styles.navList]}>
                                <View style={[styles.flex,{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingLeft:10}]}>
                                    <Image  style={[styles.imageSize]} source={require("./img/icon_binding@2x.png")}/>
                                    <Text style={{marginLeft:10}}>绑定其他平台</Text>
                                </View>
                                <View style={[styles.flex,styles.floatRight]}>
                                    <Image  style={styles.imageSize} source={require("./img/arrow_gray_right@2x.png")}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.white,styles.row_bottom1]}>
                        <TouchableOpacity  onPress={() => {
                         }}>
                            <View style={[styles.navList]}>
                                <View style={[styles.flex,{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingLeft:10}]}>
                                    <Image  style={[styles.imageSize]} source={require("./img/icon_share@2x.png")}/>
                                    <Text style={{marginLeft:10}}>分享给好友</Text>
                                </View>
                                <View style={[styles.flex,styles.floatRight]}>
                                    <Image  style={styles.imageSize} source={require("./img/arrow_gray_right@2x.png")}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.white,styles.row_bottom1]}>
                        <TouchableOpacity  onPress={() => {
                         }}>
                            <View style={[styles.navList]}>
                                <View style={[styles.flex,{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingLeft:10}]}>
                                    <Image  style={[styles.imageSize]} source={require("./img/icon_fresh@2x.png")}/>
                                    <Text style={{marginLeft:10}}>检查更新</Text>
                                </View>
                                <View style={[styles.flex,styles.floatRight]}>
                                    <Image  style={styles.imageSize} source={require("./img/arrow_gray_right@2x.png")}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.white,styles.row_bottom10]}>
                        <TouchableOpacity  onPress={() => {
                         }}>
                            <View style={[styles.navList]}>
                                <View style={[styles.flex,{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingLeft:10}]}>
                                    <Image  style={[styles.imageSize]} source={require("./img/icon_feedback@2x.png")}/>
                                    <Text style={{marginLeft:10}}>意见反馈</Text>
                                </View>
                                <View style={[styles.flex,styles.floatRight]}>
                                    <Image  style={styles.imageSize} source={require("./img/arrow_gray_right@2x.png")}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.white,styles.row_bottom10]}>
                        <TouchableOpacity  onPress={() => {
                         }}>
                            <View style={[styles.navList]}>
                                <View style={[styles.flex,{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingLeft:10}]}>
                                    <Image  style={[styles.imageSize]} source={require("./img/icon_setting@2x.png")}/>
                                    <Text style={{marginLeft:10}}>意见反馈</Text>
                                </View>
                                <View style={[styles.flex,styles.floatRight]}>
                                    <Image  style={styles.imageSize} source={require("./img/arrow_gray_right@2x.png")}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        if(route.name=="myCollect"){
            //route.showTabBar();//隐藏tabBar
           //  this.props.showTabBar(false);
            return <MyCollectScreen  title={"我的收藏"} navigator={navigationOperations}/>
        }

    },
    render:function(){

        var initialRoute = {name: 'my'};//route==initialRoute name用于routeMapper的处理
        return (
            <Navigator
                style={styles.container}
                initialRoute={initialRoute}
                configureScene={() =>Navigator.SceneConfigs.FadeAndroid }
                renderScene={this.RouteMapper}
                />)
    }
});
const styles = StyleSheet.create({
     toolbar:{
         backgroundColor:"#F05339",
         height:50,
     },
    toolbar_text:{
       color:"#fff",
        fontSize:18,
    },
     flex:{flex:1},
     container:{
         flex:1,
         backgroundColor:"#F0F0F0",
     },
     white:{
         backgroundColor:"#fff",
     },
     row:{
         flexDirection:"row",
         height:90
     },
     item:{
         alignItems:"center",
         justifyContent:"center",
     },
    item_first:{
        borderRightColor:"#000",
        borderRightWidth:1/PixelRatio.get()
    },
    row_bottom1:{
        marginBottom:1,
    },
    row_bottom10:{
        marginBottom:10
    },
    navList:{
        height:50,
        flexDirection:"row"
    },
    imageSize:{
        width:25,
        height:25
    },
    floatRight:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
    }

});
module.exports=MyScreen;