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
import TabNavigator from 'react-native-tab-navigator';
var tabNavConf=require("./conf/tabNav").tabNavConf;
var SerialBlankScreen=require("./test/serialBlank");

/**
 * @des:用读取配置的方式取tabNav的配置值
 */
/***
 * title 标题，如果不设置则为空
 * renderIcon 所示图标
 * renderSelectedIcon 选中时所显示的图标
 * badgeText 表推送显示的数字
 * renderBadge={() => <CustomBadgeView />}表渲染
 * onPress 绑定点击事件
 */
class myTab extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { selectedTab:"home0"};
  }
  render() {
    var parent=this;
    return (
        <TabNavigator>
          {

            tabNavConf.map(function(e,ii){
            return (
                <TabNavigator.Item
                    selected={parent.state.selectedTab === 'home'+ii}
                    renderIcon={() =>  <Image style={{flex:1,width:30,height:30}} source={{uri:e.renderIcon}} />}
                    renderSelectedIcon={() =>  <Image style={{flex:1,width:30,height:30}} source={{uri:e.renderSelectedIcon}} />}
                    badgeText="1"
                    onPress={() => parent.setState({selectedTab: 'home'+ii })}>
                  <SerialBlankScreen title={e.title} model={e.model}></ SerialBlankScreen>
                </TabNavigator.Item>
            );
          })
          }
          <TabNavigator.Item
              selected={this.state.selectedTab === 'profile'}
              renderIcon={() => <Image source={require("./img/btn_tabbar_2@2x.png")} />}
              renderSelectedIcon={() => <Image source={require("./img/btn_tabbar_2_hl@2x.png")} />}
              renderBadge={() => <Text>bbbbbbb</Text>}
              onPress={() => this.setState({ selectedTab: 'profile' })}>
            <View>
              <Text>ffffffffffff</Text>
            </View>
          </TabNavigator.Item>
        </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('myTab', () => myTab);
