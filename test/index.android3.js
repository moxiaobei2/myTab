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
var ToolScreen=require("./../ToolScreen");
var MyScreen=require("./../MyScreen");
var TestScreen=require("./../TestScreen");
/**
 * @des:汽车报价首页
 */

class myTab extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = { selectedTab:"my",showTabBar: true};//默认选中第一个
      this._showTabBar = this._showTabBar.bind(this);
  }
    _showTabBar(event) {
       this.setState({showTabBar:false});
    }

  render() {
     var parent=this;
      let tabBarStyle = {};
      let sceneStyle = {};
      if (!this.state.showTabBar) {
          tabBarStyle.height = 0;
          tabBarStyle.overflow = 'hidden';
          sceneStyle.paddingBottom =0;
          tabBarStyle.opacity=0;//这一步很重要哦，如果没有这个值，安卓还是会显示
      }
    return (
        <TabNavigator tabBarStyle={tabBarStyle} sceneStyle={sceneStyle}  >
            <TabNavigator.Item
                selected={this.state.selectedTab === 'search'}
                renderIcon={() => <Image  source={require("./../img/btn_tabbar_1@2x.png")} />}
                renderSelectedIcon={() => <Image source={require("./../img/btn_tabbar_1_hl@2x.png")} />}
                renderBadge={() => <Text></Text>}
                onPress={() => this.setState({ selectedTab: 'search' })}>
                <View>
                    <Text>找车</Text>
                </View>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'promote'}
                renderIcon={() => <Image source={require("./../img/btn_tabbar_2@2x.png")} />}
                renderSelectedIcon={() => <Image   source={require("./../img/btn_tabbar_2_hl@2x.png")} />}
                renderBadge={() => <Text></Text>}
                onPress={() => this.setState({ selectedTab: 'promote' })}>
                <View>
                    <Text>优惠</Text>
                </View>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tool'}
                renderIcon={() => <Image  source={require("./../img/btn_tabbar_3@2x.png")} />}
                renderSelectedIcon={() => <Image   source={require("./../img/btn_tabbar_3_hl@2x.png")} />}
                renderBadge={() => <Text></Text>}
                onPress={() => this.setState({ selectedTab: 'tool' })}>
                <ToolScreen></ToolScreen>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'my'}
                renderIcon={() => <Image   source={require("./../img/btn_tabbar_4@2x.png")} />}
                renderSelectedIcon={() => <Image  source={require("./../img/btn_tabbar_4_hl@2x.png")} />}
                renderBadge={() => <Text></Text>}
                onPress={() => this.setState({ selectedTab: 'my' })}>
               <MyScreen _showTabBar={this._showTabBar}></MyScreen>
            </TabNavigator.Item>

            <TabNavigator.Item
                selected={this.state.selectedTab === 'test'}
                renderIcon={() => <Image   source={require("./../img/btn_tabbar_4@2x.png")} />}
                renderSelectedIcon={() => <Image  source={require("./../img/btn_tabbar_4_hl@2x.png")} />}
                renderBadge={() => <Text></Text>}
                onPress={() => this.setState({ selectedTab: 'test' })}>
                <TestScreen></TestScreen>
            </TabNavigator.Item>
        </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('myTab', () => myTab);
