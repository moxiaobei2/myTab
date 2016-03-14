/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    Image,
    BackAndroid,
    Navigator,
    ToolbarAndroid,
    ToastAndroid,
    View
} from 'react-native';
var MainScreen=require("./MainScreen");
var WebViewScreen=require("./WebViewScreen");
/**
 * @des:汽车报价首页
 */
var _navigator;
class myTab extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {selectedSerial:null};
      this.RouteMapper = this.RouteMapper.bind(this)//这一部分非常重要，将自己绑定传给方法内容使用this对你蝗方法
  }
    _setSelectedSerial(serials){
         this.setState({"selectedSerial":serials});
    }

  RouteMapper(route, navigationOperations, onComponentRef) {
     _navigator = navigationOperations;
      if(route.name=="main") {
          return (
              <MainScreen  mainNavigator={navigationOperations} setSelectedSerial={(se)=>{
              this._setSelectedSerial(se);
              }}></MainScreen>
          );
      }
      if(route.name=="serialdetail"){//车系综述页 用webView跳转
          console.log(44+"==============>");
          console.log(this.state.selectedSerial);
          var url="http://mrobot.pcauto.com.cn/xsp/s/auto/buy/v1.7/serial.xsp?serialId="+this.state.selectedSerial.id+"&areaId=1&v=1.1.0";
         return (<WebViewScreen title={this.state.selectedSerial.name} url={url} navigator={navigationOperations}/>);
      }
  }
  render() {
      var initialRoute = {name: 'main'};
      return (
          <Navigator
              style={styles.container}
              initialRoute={initialRoute}
              configureScene={() =>Navigator.SceneConfigs.FadeAndroid }
              renderScene={this.RouteMapper}
              />)
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('myTab', () => myTab);
