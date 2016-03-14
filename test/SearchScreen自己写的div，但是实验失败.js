/**
 * Created by pc on 2016/03/02
 * 2016-03-03的备份
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
    ScrollView,
    ProgressBarAndroid,
    Animated,
    Easing,
    DrawerLayoutAndroid,
    View
} from 'react-native';
var Swiper = require('react-native-swiper');
import Toast from 'react-native-root-toast';
//import Drawer from 'react-native-drawer'
var swipperTuan=    {
    "title": "团购列表",
    "link": "http://mrobot.pcauto.com.cn/buy/price/activityListv11",
    "picUrl": "http://img0.pcauto.com.cn/pcauto/client/000089086/000089246/1512/tuangou.jpg",
    "type": "4"
};

var hotBrand=[
    {
        "id": 1,
        "key":1,
        "name": "奥迪",
        "logo": "http://img0.pcauto.com.cn/pcauto/1208/06/2064117_1-Audi.jpg"
    },
    {
        "id": 20,
        "key":20,
        "name": "宝马",
        "logo": "http://img0.pcauto.com.cn/pcauto/1208/06/2064196_9-Bmw.jpg"
    },
    {
        "id": 2,
        "key":2,
        "name": "大众",
        "logo": "http://img.pcauto.com.cn/images/upload/upc/tx/auto5/1602/16/c33/18331916_1455612614673_96x96.jpg"
    },
    {
        "id": 10,
        "key":10,
        "name": "丰田",
        "logo": "http://img0.pcauto.com.cn/pcauto/1208/06/2065071_62-Fengtian.jpg"
    },
    {
        "id": 21,
        "key":21,
        "name": "福特",
        "logo": "http://img0.pcauto.com.cn/pcauto/1208/06/2064925_58-Ford.jpg"
    }
];
var DataRepository = require('./DataRepository');//brands加入本地存储，这样方便空间
var repository = new DataRepository();
var SerialsBar=require("./lib/SerialsBar");
var Dimensions = require('Dimensions');
var searchScreen=React.createClass({
    getInitialState: function() {

        return {
            collectPressed: 0,
            tuanPressed: 0,
            nearPressed: 0,
            salePressed: 0,
            brands:null,
            offsetY:0,
            listHeight:0,
            isShowTop:0,
            showIndex:null,
            showDrawer:0,
            brandId:1,//默认是1
        };
    },
    fetchData: function() {
        repository.getBrands()
            .then((result) => {
                if (result){
                    var height=0;
                    var length=result.sections.length;
                    //height=40*length+10*(length-1)+length;
                    result.sections.forEach(function(e,index){
                        var ronNum=e.rowNum;
                        height+=80*ronNum+1*ronNum+40+11;
                        e.topHeight=340+height;

                    });
                    this.setState({listHeight:height});
                    this.setState({brands: result});
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .done();
        repository.updateBrands();
    },
    componentDidMount: function() {//mount之前 componentDidMount mount之后
        this.fetchData();
    },
    getSerialBarContent:function(){
        return this.state.brandId!=null?<SerialsBar brandId={this.state.brandId}/>:<ProgressBarAndroid  color="black" styleAttr='Inverse'
                                                                                                        style={{alignItems:'center',justifyContent:'center'}}/>;
    },
    toastShow:function(str){
        var parent=this;
        var toast= Toast.show(str, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
            },
            onShown: () => {
            },
            onHide: () => {

            },
            onHidden: () => {

            }
        });


        setTimeout(function () {
            Toast.hide(toast);
        }, 1000);

    },
    render:function(){
        var parent=this;
        //onDrawerSlide
        return (
            <View style={[styles.flex,styles.container]}>
                <View style={[styles.toolbar,styles.item]}>
                    <Text style={styles.toolbar_text}>搜索</Text>
                </View>
                <View  style={styles.flex}>
                    <ScrollView ref="myScrollView"
                        onScroll={(e) =>{
                                            var offsetY = e.nativeEvent.contentOffset.y;//竖直方向滚动
                                            var totalHeight=e.nativeEvent.contentSize.height;
                                            parent.setState({
                                                offsetY
                                              });
                                             var sections=parent.state.brands.sections;
                                             var total=parent.state.brands.total;

                                            if(offsetY>340){
                                              for(var i=0;i<total;i++){
                                                if(offsetY<sections[0].topHeight){
                                                  parent.setState({isShowTop:1,showIndex:sections[0].index});
                                                  break;
                                                }
                                                if(i>=1&&sections[i-1].topHeight<=offsetY){
                                                  if(sections[i].topHeight>offsetY){
                                                    parent.setState({isShowTop:1,showIndex:sections[i].index});
                                                    break;
                                                  }

                                                }
                                             }
                                            }else{
                                              parent.setState({isShowTop:0,showIndex:null});
                                            }

                                            this.props.onScroll && this.props.onScroll(e);
                                          }
                                  }
               >
                        <View style={styles.wrapper}  ref="test">
                            <Swiper showsButtons={false} showsHorizontalScrollIndicator={true} >
                                <View style={styles.wrapper}>
                                    <Image style={styles.logo}
                                           source={{uri:"http://img0.pcauto.com.cn/pcauto/client/000089086/000089246/1512/tuangou.jpg"}}/>
                                </View>
                                <View style={styles.wrapper}>
                                    <Image style={styles.logo}
                                           source={{uri:"http://img0.pcauto.com.cn/pcauto/client/000089086/000089246/1512/tuangou.jpg"}}/>
                                </View>
                                <View style={styles.wrapper}>
                                    <Image style={styles.logo}
                                           source={{uri:"http://img0.pcauto.com.cn/pcauto/client/000089086/000089246/1512/tuangou.jpg"}}/>
                                </View>
                            </Swiper>
                        </View>

                        <View style={[styles.middel_button,styles.row_bottom10,styles.white]}>
                            <View style={[styles.item,styles.flex,styles.item_first]} >
                                <TouchableOpacity style={styles.item} onPress={() => {
                    //此处作按钮的跳转
                    this.setState({collectPressed:!this.state.collectPressed});

                }}>
                                    <Image source={this.state.collectPressed?require("./img/bth_collect_selected@3x.png"):require("./img/bth_collect@2x.png")}/>
                                    <Text>我的收藏</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.item,styles.flex]} >
                                <TouchableOpacity style={styles.item} onPress={() => {
                                         //此处作按钮的跳转
                                          this.setState({salePressed:!this.state.salePressed});

                                         }}>
                                    <Image source={this.state.salePressed?require("./img/sales_rank_highligh@2x.png"):require("./img/sales_rank_normal@2x.png")}/>
                                    <Text>销量排行榜</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.item,styles.flex]} >
                                <TouchableOpacity style={styles.item} onPress={() => {
                                         //此处作按钮的跳转
                                          this.setState({nearPressed:!this.state.nearPressed});
                                         }}>
                                    <Image source={this.state.nearPressed?require("./img/near_dearler_highligh@2x.png"):require("./img/near_dearler_normal@2x.png")}/>
                                    <Text>附近经销商</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.item,styles.flex]} >
                                <TouchableOpacity style={styles.item} onPress={() => {
                                         //此处作按钮的跳转
                                          this.setState({tuanPressed:!this.state.tuanPressed});
                                         }}>
                                    <Image source={this.state.tuanPressed?require("./img/bth_tuan_selected@2x.png"):require("./img/bth_tuan@2x.png")}/>
                                    <Text>团购</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={[styles.hotbrand_title,styles.row_bottom1,styles.white]}>
                            <Text>热门品牌</Text>
                        </View>
                        <View style={[styles.middel_button,styles.white, styles.row_bottom10]}>
                            {
                                hotBrand.map(function (e, ii) {
                                    return (
                                        <View style={[styles.item, styles.flex]}>
                                            <TouchableOpacity style={styles.item} onPress={() => { }}>
                                                <Image  style={{resizeMode:"contain",height:50,width:50}} source={{uri: e.logo}}/>
                                                <Text>{e.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })
                            }
                        </View>

                        {
                            this.state.brands?this.state.brands.sections.map(function(e,ii){
                                var length=parent.state.brands.sections.length-1;
                                return (
                                    <View style={ii==length?{}:styles.row_bottom10} key={e.key}>
                                        <View  style={[styles.hotbrand_title,styles.row_bottom1,styles.white]}>
                                            <Text style={{marginLeft:20}}>{e.index}</Text>
                                        </View>
                                        {
                                            e.brands.map(function(eb,ebii){
                                                return (
                                                    <TouchableOpacity key={eb.key} style={[styles.flex,styles.row_bottom1]} onPress={() => {
                                                           parent.setState({"brandId":eb.id,showDrawer:1});

                                                      }}>
                                                        <View style={[styles.middel_button,styles.white,styles.flex,styles.item,{justifyContent:'flex-start'}]}>
                                                            <Image  style={{resizeMode:"contain",height:80,width:100,marginLeft:-20}} source={{uri:eb.logo}}/>
                                                            <Text style={[styles.sidebar_text,{fontSize:16,color:'#1C3C66',fontWeight:'bold'}]}>{eb.name}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>

                                );
                            }):<ProgressBarAndroid  color="black" styleAttr='Inverse'
                                                    style={{alignItems:'center',justifyContent:'center'}}/>

                        }

                    </ScrollView>
                    {
                       this.state.isShowTop?[
                        (
                              <View  style={[styles.hotbrand_title,styles.white,{position:"absolute",top:0,width:Dimensions.get('window').width}]}>
                                  <Text style={{marginLeft:20}}>{this.state.showIndex}</Text>
                              </View>
                          )
                       ]:null
                    }


                    <View style={styles.sidebar}>
                        {
                            this.state.brands?this.state.brands.sections.map(function(e,ii){
                                return (
                                    <TouchableOpacity style={styles.item} onPress={() => {
                                       parent.toastShow(e.index);
                                       var sections=parent.state.brands.sections;
                                       var y=340;
                                       for(var i=0;i<ii;i++){
                                          var rowNum=sections[i].rowNum;
                                           y+=40+((i!=sections.length-1)?11:0)+80*rowNum+rowNum;
                                       }
                                       parent.refs.myScrollView.scrollTo({x:0,y:y,animated:true});

                                   }}>
                                        <Text style={[styles.sidebar_text]}>{e.index}</Text>
                                    </TouchableOpacity>
                                );
                            }):<Text></Text>

                        }
                    </View>

                    {
                        this.state.showDrawer?[
                            <View style={{overflow:"visible",backgroundColor:"transparent",width:Dimensions.get('window').width / 5 * 3.5,position:"absolute",top:0,right:-40}}>
                                <View style={[{width:Dimensions.get('window').width / 5 * 3}]}>
                                    {this.getSerialBarContent()}
                                </View>
                            </View>
                        ]:null
                    }
                </View>
            </View>

        );
    }
})
const styles = StyleSheet.create({
    sidebar:{
        position: 'absolute',
        right:5,
        width:20,
        top:170
    },
    sidebar_text_Show:{
        fontSize:18
    },
    sidebar_text:{
        color:'#C4CDDD',
        fontWeight:'bold'
    },
    container:{
        backgroundColor:"#F0F0F0",
    },
    logo:{
        left: 0,
        right: 0,
        height: 120
    },
    flex:{
        flex:1
    },
    toolbar:{
        backgroundColor:"#F05339",
        height:50,
    },
    item:{
        alignItems:"center",
        justifyContent:"center",
    },
    toolbar_text:{
        color:"#fff",
        fontSize:18,
    },
    wrapper:{
        height:120,
        left: 0,
        right: 0,
    },
    middel_button:{
        height:80,
        flexDirection:"row",
    },
    white:{
        backgroundColor:"#fff",
    },
    row_bottom1:{
        marginBottom:1,
    },
    row_bottom10:{
        marginBottom:10
    },
    hotbrand_title:{
        height:40,justifyContent:"center"
    }


});
module.exports=searchScreen;
