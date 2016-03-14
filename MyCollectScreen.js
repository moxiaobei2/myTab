/**
 * Created by wuxiaoling on 2016/2/26.
 * @des:我的收藏页
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    Image,
    PixelRatio,
    ToolbarAndroid,
    TouchableOpacity,
    View
} from 'react-native';
var NavBar=require("./lib/NavBar");//导航组件
var MyCollectScreen=React.createClass({
    render:function(){
        return(
            <View style={styles.flex}>
                <NavBar title={this.props.title}  navigator={this.props.navigator}></NavBar>
                <Text>我的收藏页出现了</Text>
            </View>
        );
    }
});
const styles = StyleSheet.create({
    flex:{flex:1}
});
module.exports=MyCollectScreen;