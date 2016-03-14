/**
 * Created by pc on 2016/2/26.\
 * for:找车，找开侧边栏出现manufacturers相关信息
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
    Dimensions,
    ProgressBarAndroid,
    ScrollView,
    WebView,
    View
} from 'react-native';
var DataRepository = require('../DataRepository');//brands加入本地存储，这样方便空间
var repository = new DataRepository();
var SerialsBar=React.createClass({
    getInitialState: function() {
        return {
            serials:{},
            offsetY:0,
            isShowTop:0,
            showIndex:null,
            selectedSerial:null
        };
    },
    changeBrand:function(brandId){
          this.setState({"brandId":brandId});
        this.fetchData();
    },
    fetchData: function() {
        var serial=this.state.serials;
        var tempBrandId=this.props.brandId;
        if(!serial[tempBrandId]){
            repository.getSerials(this.props.brandId)
                .then((result) => {
                    this.setState({"brandId":tempBrandId});
                    if (result){
                        var height=0;
                        result.forEach(function(e,index){
                            var rowNum=e.serials.length;
                            height+=100*rowNum+1*rowNum+40+11;
                            e.topHeight=height;
                        });
                        serial[tempBrandId]=result;//加入保存值的处理，避免再次请求库
                        this.setState({serials: serial});
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .done();
            repository.updateSerials(this.props.brandId);
        }

    },
    componentDidMount: function() {//mount之前 componentDidMount mount之后
        this.fetchData();
    },
    render:function(){
          var parent=this;
          return (
              <View style={styles.flex}>
                  <ScrollView
                               onScroll={(e) =>{//滑动功能完成
                                            var offsetY = e.nativeEvent.contentOffset.y;//竖直方向滚动
                                            var totalHeight=e.nativeEvent.contentSize.height;
                                            this.setState({
                                                offsetY
                                              });
                                             var serials=this.state.serials[parent.state.brandId];
                                             var total=serials.length;

                                              for(var i=0;i<total;i++){
                                                if(offsetY<serials[0].topHeight){
                                                  this.setState({isShowTop:1,showIndex:serials[0].name});
                                                  break;
                                                }
                                                if(i>=1&&serials[i-1].topHeight<=offsetY){
                                                  if(serials[i].topHeight>offsetY){
                                                    this.setState({isShowTop:1,showIndex:serials[i].name});
                                                    break;
                                                  }

                                                }
                                             }
                                            this.props.onScroll && this.props.onScroll(e);
                                          }
                                          }

                      >
                      {
                          this.state.serials[parent.state.brandId]?this.state.serials[parent.state.brandId].map(function(e,ii){
                               var keyii="brandNaMe_"+ii
                              return (
                                  <View key={keyii}>
                                      <View style={styles.brandName} >
                                          <Text style={{marginLeft:20}}>{e.name}</Text>
                                      </View>
                                      {
                                          e.serials.map(function(es,esii){
                                              var keyesii="serial_"+esii;
                                              return (
                                                  <TouchableOpacity key={keyesii}  onPress={(e) =>{
                                                //  e.preventdefault();
                                                        parent.props.setSelectedSerial(es);
                                                        console.log("serialBar 110 =========点击的结果是=========>");
                                                        console.log(es);
                                                        parent.props.mainNavigator.push({"name":"serialdetail"});
                                                  }}>
                                                      <View style={styles.middle} >
                                                          <Image source={{uri:es.photo}} style={{width:90,height:80,marginLeft:5}}/>
                                                          <View style={{marginLeft:10}}>
                                                          <Text style={{lineHeight:30,fontSize:16,color:"#000"}}>{es.name}</Text>
                                                          <Text style={{lineHeight:20}}>{es.priceRange}</Text>
                                                           <Image source={require("./../img/askPrice.png")} style={{height:30,borderRadius:6}}/>
                                                          </View>
                                                      </View>
                                                  </TouchableOpacity>
                                              )
                                          })
                                      }
                                  </View>

                              );
                          }): <ProgressBarAndroid color="black" styleAttr='Inverse'
                                                   style={{alignItems:'center',justifyContent:'center'}}/>

                      }

                  </ScrollView>
                    {
                        this.state.isShowTop?[
                            (
                                <View  style={[styles.hotbrand_title,{position:"absolute",top:0,width:300}]}>
                                    <Text style={{marginLeft:20}}>{this.state.showIndex}</Text>
                                </View>
                            )
                        ]:null
                    }
                  </View>
        )
    }
})
const styles = StyleSheet.create({
    hotbrand_title:{
        height:40,justifyContent:"center",
        backgroundColor:"#fff"
    },
     flex:{
         flex:1,
         borderLeftColor:"#F05339",
         borderLeftWidth:1/ PixelRatio.get(),
         backgroundColor:"#F0F0F0"
      },
     brandName:{
         backgroundColor:"#fff",
         height:40,
         marginBottom:1,
         justifyContent:"center"
     },
    middle:{
        alignItems:"center",
        flexDirection:"row",
        height:100,
        marginBottom:1,
        backgroundColor:"#fff",
    }

});
module.exports=SerialsBar;
