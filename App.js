import React from 'react';
import { StyleSheet,Dimensions,TouchableOpacity, Text, View } from 'react-native';
import CountryModal from './src/react-native-country-modal';
export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      showModal:false,
      country:{alpha2:'PH'}
    }
  }
  onClose(){
    this.setState({showModal:false});
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Country Selected: {this.state.country.name}</Text>
        <TouchableOpacity style={[styles.button,styles.outline]} onPress={()=>this.setState({showModal:true})}>
          <Text style={styles.outlineText}>Show Country Modal</Text>
        </TouchableOpacity>
        <CountryModal 
          //Required
          value={this.state.country.alpha2}
          visible={this.state.showModal}
          onClose={this.onClose.bind(this)}
          onSelect={(item)=>{this.setState({country:item,showModal:false})}}

          //Optional
          // title={'Country1'}
          // headerStyle={{backgroundColor:'red'}}
          // itemStyle={{backgroundColor:'red'}}
          // containerStyle={{backgroundColor:'red'}}
          />
      </View>
    );
  }
}
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    marginTop:8,    
    marginBottom:8,    
    borderColor:"#A9B8C6",
    borderWidth:1,
    borderRadius:5,
    height:48,
    width:(width/2)-20,
    marginLeft:5,
    marginRight:5,
    alignItems:"center",
    justifyContent:"center"
  },
  outline:{
    width:width-40,
    marginLeft:20,
    marginBottom:10,
    borderColor:'#2388E6',
    backgroundColor:"#fff",
    // fontFamily: "ProximaNova-Bold"
  },
  outlineText:{
    color:"#2388E6",
    fontSize:16,
    lineHeight:20,
    // fontFamily: "ProximaNova-Regular"    
  },
});
