import React, {Component} from 'react';
import {
        Image, Text,
        View, TouchableOpacity, ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

import styles from '../style/editMyProfileStyle';
import I18n from '../i18n/index';

class SubCateogryItem extends Component{

  constructor(props){
    super(props);
    this.state = {
      refresh: false
    }
  }

  clickSubItem(item){
    if(this.props.isEditable){
      const{refresh} = this.state;
      item.selected = !item.selected;
      this.setState({refresh: !refresh})
    }
  }

  render(){
    const{value, key, colorBegin, colorEnd} = this.props;

    return(
      <TouchableOpacity key = {key} style={!value.selected ? styles.btnGroupItem : null} onPress = {() => this.clickSubItem(value)}>
          {value.selected &&
              <LinearGradient colors={[colorBegin, colorEnd]} style={styles.btnGroupItem}>
                  <Text style={[styles.detailedItemText, styles.detailedItemTextNormal]}>{value.text}</Text>
              </LinearGradient>
          }
          {!value.selected &&
              <Text style={[styles.detailedItemText, styles.detailedItemTextSelected]}>{value.text}</Text>
          }
      </TouchableOpacity>
    )
  }
}

export default class ContactSubCategoryItem extends Component{
  render(){
    const {colorBegin, colorEnd, subcategoryArray, title, isEditable, closeTitle} = this.props
    var subCategories = [];
    for(let i = 0; i < subcategoryArray.length; i += 2){
      const value = subcategoryArray[i];
      const value1 = (i+1) < subcategoryArray.length ? subcategoryArray[i+1] : '';
      subCategories.push(
        <View>
          <SubCateogryItem
            value={value}
            colorBegin = {colorBegin}
            colorEnd = {colorEnd}
            isEditable = {isEditable}
            key={i}
          />
          {
            value1 !== '' &&
             <SubCateogryItem
              value={value1}
              isEditable = {isEditable}
              colorBegin = {colorBegin}
              colorEnd = {colorEnd}
              key={i+1}
            />
          }
        </View>
      )
    }

    return(
        <DialogContent>
          <View style={styles.dialogContent}>
              <View>
                  <Text style={styles.dialogTitle}>{title}</Text>
              </View>
              <View style={{marginTop: 20}}>
                <ScrollView
                  horizontal={true}
                  containerStyle={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "flex-start"
                  }}
                >
                  {subCategories}
                </ScrollView>
              </View>

              <TouchableOpacity style={styles.dialogButton} onPress={() => {
                      this.props.showContactSubItemDialog(false);
                  }}>
                  
                  <LinearGradient colors={ ["#fdc810", "#fde256"]} style={[styles.formElement, styles.dialogButton]}>
                      <Text style={[styles.dialogButtonText]}>{closeTitle}</Text>
                  </LinearGradient>

              </TouchableOpacity>

          </View>
      </DialogContent>
    )
  }
}
