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
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
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
    this.state = { selectedTab:"home"};
  }
  render() {
    return (
        <TabNavigator>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'home'}
              title=" "
              renderIcon={() => <Image source={require("./../img/btn_tabbar_1@2x.png")} />}
              renderSelectedIcon={() => <Image source={require("./../img/btn_tabbar_1_hl@2x.png")} />}
              badgeText="1"
              onPress={() => this.setState({ selectedTab: 'home' })}>
            <View>
              <Text>qqqqqqqqq</Text>
            </View>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'profile'}
              title=" "
              renderIcon={() => <Image source={require("./../img/btn_tabbar_2@2x.png")} />}
              renderSelectedIcon={() => <Image source={require("./../img/btn_tabbar_2_hl@2x.png")} />}
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
