import React, {Component} from 'react';
import {
        Image, Text,
        View, TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../style/contactStyle';
import * as userActions from '../store/actions/userActions';

export default class ContactItem extends Component{

  constructor(props){
      super(props);
      this.state= {
        refresh: false
      }
  }

  onItemClicked(categoryObj, index, innerkey){
    if(this.props.selectedContactCount === 5 && categoryObj.selected === false){
      console.log('max liimited===')
    }else{
      categoryObj.selected = !categoryObj.selected;
      this.props.updateSelectedContacts(categoryObj.selected, index, innerkey)
    }
  }

  render(){
    const{item, index} = this.props;
    
    return(
      <View key = {index} style={styles.gridContainer}>
      {
        item.map((innervalue, innerkey) =>
          {
            let imageFile = userActions.getContactImagePath(innervalue['image']); 
           
            return(
              <TouchableOpacity key = {index + innerkey} onPress={() => this.onItemClicked(innervalue, index, innerkey)}>
                  {!innervalue.selected &&
                      <View style={styles.gridItem}>
                          <Image source={imageFile} resizeMode='contain' style={styles.gridItemImage}/>
                          <Text style={styles.gridItemText}>{innervalue.text}</Text>
                      </View>
                  }
                  {innervalue.selected &&
                      <LinearGradient colors={[innervalue.begin, innervalue.end]} style={[styles.gridItem, styles.bordered]}>
                          <Image source={imageFile} resizeMode='contain' style={styles.gridItemImage}/>
                          <Text style={styles.gridItemText}>{innervalue.text}</Text>
                      </LinearGradient>
                  }
              </TouchableOpacity>
            )
          }
        )
      }
    </View>
    )
  }
 }