/**
 * Created by pc on 2016/3/14.
 */
'use strict';

var React = require('react-native');
var {
    Image,
    ListView,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    } = React;
var DataRepository = require('./DataRepository');//brands加入本地存储，这样方便空间
var repository = new DataRepository();
var PromoteScreen = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },
    fetchData: function() {
        repository.getPromotions()
            .then((result) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.data)
                });
            })
            .catch((error) => {
                console.error(error);
            })
            .done();
        repository.updatePromotions();//得到优惠数据
    },
    componentWillMount: function() {
        this.fetchData();
    },

    render: function() {
    return (
        <View style={[styles.flex,styles.container]}>
            <View style={[styles.toolbar,styles.item]}>
                <Text style={styles.toolbar_text}>优惠</Text>
            </View>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                />
        </View>
    );
},

_renderRow: function(rowData: Object, sectionID: number, rowID: number) {
   // console.log(rowData)
    var parent=this;
    return (
        <View style={styles.row_bottom10} onPress={() =>{}}>
             <View style={[styles.hotbrand_title,styles.row_bottom1,styles.white]}>
                 <Text style={{marginLeft:10}}>{rowData.serialGroupName}</Text>
             </View>
            {
                rowData.models.map(function(e,ii){
                    var iikey="pro_"+ii;
                    e.id=rowData.serialGroupId;
                    return (
                        <TouchableOpacity  key={iikey} style={[styles.row_bottom1,styles.white]} onPress={() =>{
                           //车系页跳转
                            parent.props.setSelectedSerial(e);
                            parent.props.mainNavigator.push({"name":"serialdetail"});
                        }}>
                        <View style={[styles.hotbrand_title,{marginLeft:10}]}><Text>{e.modelName}</Text></View>
                        <View style={[styles.middel_button,styles.white]}>
                            <View style={[styles.flex,{marginLeft:10}]}>
                            <Text style={{fontSize:14,color:'#C0C0C0'}} >{e.dealerName}</Text>
                            </View>
                            <View style={[styles.flex,{alignItems:"flex-end",marginRight:10}]} >
                             <Text style={{fontSize:14,color:'red'}}>{e.currentPrice}</Text>
                             </View>
                        </View>
                            <View style={[styles.middel_button,styles.white]}>
                                <View style={[styles.flex,{marginLeft:10}]}>
                                    <Text style={{fontSize:14,color:'red'}} >{e.modelType}</Text>
                                </View>
                                <View style={[styles.flex,{alignItems:"flex-end",marginRight:10}]} >
                                    <Text style={{fontSize:14,color:'green'}}>↓{e.discount}</Text>
                                </View>
                            </View>
                        </TouchableOpacity >

                    )
                })
            }
        </View>
    );
},

});


var styles = StyleSheet.create({
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
        height:30,
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

module.exports =PromoteScreen ;