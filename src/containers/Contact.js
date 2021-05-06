import React, {Component} from 'react';
import {Platform, StyleSheet,
        Image, Text,
        View, TextInput,
        TouchableOpacity,
        Dimensions, FlatList,
        ScrollView, SafeAreaView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../style/contactStyle';
import { sessionUpdateUserContact } from '../store/session/actions';
import I18n from '../i18n/index';
import YellowButton from '../components/yellowButton';
import LogoHeader from '../components/logoHeader';
import ContactItem from '../components/ContactItem';
import ContactSubCategoryItem from '../components/ContactSubCategoryItem';
import * as userActions from '../store/actions/userActions';
import firebaseService from '../services/firebase';


const dbRef = firebaseService.database();

class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            dialogVisible: false,
            firstLine: false,
            secondLine: false,
            thirdLine: false,
            selectedRow: 0,
            selectedContactCount: 0,
            selectedContactIndex: 0,
            userID: this.props.navigation.state.params.userID,
            contactLists: [],
        }

        this.updateSelectedContacts = this.updateSelectedContacts.bind(this);
        this.showContactSubItemDialog = this.showContactSubItemDialog.bind(this);
    }

    componentWillMount(){
      this.loadContactLists();
    }

    updateSelectedContacts(isSelected, key, innerkey){
      if(isSelected){
        this.setState({
                          selectedContactCount: (this.state.selectedContactCount + 1),
                          dialogVisible: true,
                          selectedRow: key,
                          selectedContactIndex: innerkey
                      })
      }else{
        this.setState({selectedContactCount: (this.state.selectedContactCount -1)})
      }
    }

    loadContactLists(){
      dbRef.ref('Contacts').once('value', (resData)=>{
        let contacts_array = [];
        resData.forEach((contactObj)=> {
          let objData = contactObj.val();
          objData['key'] = contactObj.key;
          contacts_array.push(objData);
        });
        this.updateContacts(contacts_array);
      })

    }

    updateContacts(contacts_list){
      contacts_list.forEach((contactObj)=>{
        contactObj['selected'] = false
        let subCategorylist = contactObj.subcategory
        let newsubList = []
        for (key in subCategorylist) {
          let newObj = {};
          newObj['selected'] = false
          newObj['key'] = key
          newObj['text'] = subCategorylist[key]
          newsubList.push(newObj)
        }
        contactObj.subcategory = newsubList;

      });

      let groupList = []
      let smallList = []
      contacts_list.map((listObj) =>{
        smallList.push(listObj)
        if(smallList.length === 3)
        {
          groupList.push(smallList)
          smallList = []
        }
      })
      if(smallList.length > 0)
      {
        groupList.push(smallList)
        smallList = []
      }

      this.setState({contactLists: groupList});
    }

    onContinue(){
      let selectedLists = [];
      this.state.contactLists.map((groupItem)=>{
        groupItem.map((categoryObj)=>{
          if(categoryObj.selected)
            selectedLists.push(categoryObj);
        })
      });
      if(selectedLists.length === 0)
        return;

      dbRef.ref('UsersList/' + this.state.userID).update({contacts: selectedLists});
      Actions.Interestedin({userID: this.state.userID, isFB: this.props.isFB});
    }

    showContactSubItemDialog(flag){
      this.setState({ dialogVisible: flag });
    }

    render() {
        const {contactLists, selectedContactCount, selectedRow, selectedContactIndex, refresh, dialogVisible} = this.state;
        const subCategories = contactLists.length > 0 ? contactLists[selectedRow][selectedContactIndex].subcategory : [] ;
        const colorBegin = contactLists.length > 0 ? contactLists[selectedRow][selectedContactIndex].begin : '' ;
        const colorEnd = contactLists.length > 0 ? contactLists[selectedRow][selectedContactIndex].end : '' ;

        return (

            <View style={styles.container}>

                <LogoHeader
                  onPress={()=> Actions.pop()}
                />

                <View style={styles.inputboxContainer}>
                    <Text style={styles.contactText}>{I18n.t('whatKindOfContact')}</Text>
                </View>

                <View style={styles.contactsContainer}>
                  <ScrollView horizontal={true} contentContainerStyle={{paddingHorizontal: 20}}>
                    {
                      contactLists.map((item, index)=>{
                        return (
                          <ContactItem
                            item={item}
                            index={index}
                            selectedContactCount={selectedContactCount}
                            updateSelectedContacts = {this.updateSelectedContacts}
                          />
                        )
                      })
                    }
                  </ScrollView>

                  <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10.5}}>
                      <Text style={{fontFamily: 'Lato-Regular', fontSize: 12, textAlign: "center", color: "#898989"}}>{selectedContactCount + " /5 max"}</Text>
                  </View>

                </View>

                <YellowButton
                  text='next'
                  onPress={()=>this.onContinue()}
                />

                <Dialog
                    dialogStyle = {styles.dialogContainer}
                    visible={dialogVisible}
                    width = {1}
                    height = {0.45}
                    dialogAnimation={new SlideAnimation({
                      slideFrom: 'bottom',
                    })}
                    onTouchOutside={() => {
                      this.setState({ dialogVisible: false });
                    }} >
                    <ContactSubCategoryItem
                      title = {I18n.t('detailSearch')}
                      subcategoryArray = {subCategories}
                      colorBegin = {colorBegin}
                      colorEnd = {colorEnd}
                      isEditable = {true}
                      closeTitle={I18n.t('validate').toUpperCase()}
                      showContactSubItemDialog = {this.showContactSubItemDialog}
                    />
                </Dialog>

            </View>
        );
    }
}

Contact.propTypes = {
    updateUserContact: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserContact: (contacts) => {
            dispatch(sessionUpdateUserContact(contacts));
        }
    }
}

function mapStateToProps(state){
    return {
        isloading: state.session.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
