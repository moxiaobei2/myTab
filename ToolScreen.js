/**
 * Created by wuxiaoling on 2016/2/26.
 * @des: 工具页
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
var ToolScreen=React.createClass({
    render:function(){
        return(
            <View style={styles.container}>
                <View style={[styles.toolbar,styles.item]}>
                    <Text style={styles.toolbar_text}>工具</Text>
                </View>
                <View style={styles.row} >
                     <View style={[styles.item,styles.flex,styles.item_first]} >
                         <TouchableOpacity style={styles.item} onPress={() => {
                         //此处作按钮的跳转
                         }}>
                             <Image source={require("./img/gouche@2x.png")}/>
                             <Text>购车计算器</Text>
                         </TouchableOpacity>
                     </View>
                     <View style={[styles.item,styles.flex]}>
                         <TouchableOpacity style={styles.item} onPress={() => {
                         //此处作按钮的跳转
                         }}>
                         <Image source={require("./img/chexian@2x.png")}/>
                         <Text>车险计算器</Text>
                         </TouchableOpacity>
                     </View>
                 </View>
                <View style={styles.row}>
                    <View style={[styles.item,styles.flex,styles.item_first]}>
                    <TouchableOpacity style={styles.item} onPress={() => {
                      //此处作按钮的跳转
                    }}>
                        <Image source={require("./img/vote@2x.png")}/>
                        <Text>好友帮选车</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={[styles.item,styles.flex]}>
                        <TouchableOpacity style={styles.item} onPress={() => {
                          //此处作按钮的跳转
                        }}>
                        <Image source={require("./img/duibi@2x.png")}/>
                        <Text>车型对比器</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
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
         flex:1
     },
     row:{
         flexDirection:"row",
         height:150,
         borderBottomWidth:1/PixelRatio.get(),
         borderColor:"#000"
     },
     item:{
         alignItems:"center",
         justifyContent:"center"
     },
    item_first:{
        borderRightColor:"#000",
        borderRightWidth:1/PixelRatio.get()
    }
});
module.exports=ToolScreen;