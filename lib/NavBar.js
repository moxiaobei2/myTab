/**
 * Created by wuxiaoling on 2016/2/26.
 * Test 我只是个普通的test页面
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
var NavBar=React.createClass({
    render:function(){
        return(
                <View style={[styles.toolbar,styles.item]}>
                         <View style={styles.flex}>
                            <TouchableOpacity  style={[styles.callback]} onPress={() => {
                              this.props.navigator.pop();//按返回键
                            }}>
                               <Image  style={styles.imageSize} source={require("./../img/arrow_gray_left@2x.png")}/>
                               <Text style={styles.callback_text}>返回</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.flex,styles.item]}>
                            <Text style={[styles.toolbar_text]}>{this.props.title}</Text>
                        </View>
                        <View style={styles.flex}>

                         </View>
                </View>
        );
    }
});
const styles = StyleSheet.create({
    flex:{flex:1},
    callback:{
        flexDirection:"row",
        alignItems:"center"
    },
    item:{
        alignItems:"center",
        justifyContent:"center",
    },
     toolbar:{
         backgroundColor:"#F05339",
         height:50,
         flexDirection:"row"
     },
    imageSize:{
        width:20,
        height:20,
        marginLeft:5
    },
    callback_text:{
        color:"#fff",
        fontSize:16,
        marginLeft:0
    },
    toolbar_text:{
        color:"#fff",
        fontSize:18,
    },
});
module.exports=NavBar;