/**
 * Created by pc on 2016/2/25.
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    Image,
    ToolbarAndroid,
    TouchableHighlight,
    Animated,
    Platform,
    WebView,
    BackAndroid,
    Navigator,
    ToastAndroid,
    } = React;
var tabNavConf=require("./../conf/tabNav").tabNavConf;
var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {//后退按钮的作用，只有安卓才会有的功能
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {//_navigator浏览器 .getCurrentRoutes().length
        _navigator.pop();
        return true;
    }
    return false;
});
var  SerialBlankScreen = React.createClass({
    getInitialState: function() {
        return({

        });
    },
    RouteMapper: function(route, navigationOperations, onComponentRef) {
        _navigator = navigationOperations;
        //if (route.model === 'serialBlank') {
        //    return (
        //        <View style={styles.container}>
        //            <Text>{route.model}===>{route.title}</Text>
        //        </View>
        //    );
        //} else if (route.model === 'search') {
        //    return (
        //        <View style={styles.container}>
        //            <Text>{route.model}===>{route.title}</Text>
        //        </View>
        //    );
        //}
        //tabNavConf.forEach(function(e){
        //    if(e.model==route.model){
        //
        //         if(e.child){
        //return (  <View style={styles.container}>
        //    <Text>{route.model}===>{route.title}</Text>
        //</View>);
        //         }else{
        //             return (
        //                         <View style={styles.container}>
        //                                 <Text>{route.model}===>{route.title}</Text>
        //                           </View>
        //             )
        //         }
        //    }
        //})

        for(var i=0;i<tabNavConf.length;i++){
             if(route.model==tabNavConf[i].model){
                 if(tabNavConf[i].child){
                     return (
                         <View style={styles.container}>
                             <Text>{route.model}===>{route.title}</Text>
                         </View>
                     );
                     break;
                 }else{
                     return (
                                              <View style={styles.container}>
                                                      <Text>{route.model}===>{route.title}</Text>
                                                </View>
                                  );
                     break;
                 }
             }
        }

    },
    render: function() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{"model":this.props.model,"title":this.props.title}}
                configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                renderScene={this.RouteMapper}
                />
        )
    }
});

var styles = StyleSheet.create({
});

module.exports = SerialBlankScreen;

