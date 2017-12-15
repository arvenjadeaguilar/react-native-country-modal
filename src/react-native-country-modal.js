import React from 'react';
import { StyleSheet,Dimensions,FlatList,Modal,TouchableOpacity,TextInput, Text, View, Image } from 'react-native';
import {
  codes
} from 'iso-country-codes';
import PropTypes from 'prop-types';

export default class CountryModal extends React.PureComponent {
  
  constructor(){
    super();
    this.state = {
      countryText:"",
      countryList:[]
    }
  }
  componentWillMount(){
    this.setState({countryList:codes});
  }
  changeCountrySearchText(text){
    try {
      const countryList = codes.filter(function(item){
        const name = item.altName?item.altName:item.name
        return name.toLowerCase().search(
          text.toLowerCase()) !== -1;
      });
      this.setState({countryText:text,countryList});
    } catch (error) {
      this.setState({countryText:text});
    }
  }
  _renderCountry = ({item}) => {
    return (
    <TouchableOpacity key={item.alpha2} style={[styles.option,this.props.itemStyle]} onPress={()=>this._setCountryModal(item)}>
      <Text style={styles.text}>{item.altName?item.altName:item.name}</Text>
      {
        this.props.value == item.alpha2?
        <View>
          <Image style={{height:14,width:14}} source={require('./images/check.png')} />
        </View>:null
      }
      
    </TouchableOpacity>
  );};
  _keyExtractor = (item, index) => item.alpha2;
  
  _setCountryModal(item){
    const {onSelect} = this.props;

    onSelect(item);
  }
  
  render() {
    const {title,value,visible,headerStyle,containerStyle,searchboxStyle,panelStyle} = this.props;
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={()=>{console.log('request for close modal');}}
          >
          <View style={[styles.container,containerStyle]}>
            <View style={[styles.header,headerStyle]}>
              <TouchableOpacity style={{width:50}} onPress={()=>this.props.onClose()}>
                <Text style={styles.back}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.headerText}>{title?title:'Country'}</Text>
              <View style={{width:50}}/>
            </View>
            <View style={[styles.box,panelStyle]}>
              <TextInput 
                style={[styles.textInput,styles.search,searchboxStyle]}
                value={this.state.countryText}
                placeholder="&#128270; Search"
                underlineColorAndroid={'transparent'}
                onFocus={()=>this.setState({focus:'country'})}
                onChangeText={(text) => this.changeCountrySearchText(text)}/>
              <FlatList
                style={styles.flatList}
                data={this.state.countryList}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderCountry}
                extraData={value}
              />
            </View>
          </View>
        </Modal>
    );
  }
}
CountryModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  itemStyle: PropTypes.object,
  value: PropTypes.string,
  headerStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  searchboxStyle: PropTypes.object,
  panelStyle: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f6f7f9',
  },
  header: {
    flexDirection:'row',
    // paddingTop:20,
    paddingLeft:16,
    paddingRight:16,
    marginBottom:32,    
    backgroundColor:'#2388E6',
    height:70,
    width:width,
    alignItems:'center',
    justifyContent:'space-between'
  },
  headerText:{
    color:'#FFFFFF',
    lineHeight:20,
    fontSize:16,
    textAlign:'center',
    // fontFamily: "ProximaNova-Bold",    
  },
  box:{
    backgroundColor:'#fff',
    elevation:2
  },
  search:{
    backgroundColor:'rgba(142,142,147,0.12)',
    margin:16,
    borderRadius:10,
    height:36,
    padding:8,
    color:'#363C43'
  },
  flatList:{
    height:height-190
  },
  text:{
    color:'#363C43',
    fontSize:16,
    // fontFamily: "ProximaNova-Regular",
  },
  back:{
    color:'#fff',
    // fontFamily: "ProximaNova-Regular"    
  },
  option:{
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingTop:24,
    paddingBottom:24,
    paddingLeft:16,
    paddingRight:16,
    flexDirection:'row',
    justifyContent:'space-between'
  },
});
