import { AsyncStorage , Platform} from "react-native"
import RNFetchBlob from 'react-native-fetch-blob';
import firebaseService from '../../services/firebase';
import {images} from '../../components/images';
import moment from 'moment';

export function verficationEmail(mail) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return reg.test(mail);
}

export async function _storeData(key,value){
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  //   console.warn("done done")
  } catch (error) {
    // Error saving data
  }
}

export async function  _retrieveData(key){
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      // console.warn(value);
      return value;
    }
   } catch (error) {
     // Error retrieving data
     return null;
   }
}

export async function  cleardata(){
  try {
      AsyncStorage.removeItem('userInfo');
      AsyncStorage.removeItem('logged');
   } catch (error) {
     // Error retrieving data
     return null;
   }
}

function NumberWithSpaces(x) {
  return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


export function _getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    return NumberWithSpaces(Math.round(dist * 1.609344));
}


export function uploadImage(uri, mime = 'application/octet-stream') {
  const Blob = RNFetchBlob.polyfill.Blob
  const fs = RNFetchBlob.fs
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob
  const currentTimeStamp = new Date().getTime() + '.png';

  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null
    const imageRef = firebaseService.storage().ref('images').child(`${currentTimeStamp}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        console.log(data);
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}


export function getContactImagePath(filename){
  let imageFile = '';
    if (filename === 'art') {
      imageFile = images.art.uri;
    }else if (filename === 'business') {
      imageFile = images.business.uri;
    }else if (filename === 'carpool') {
      imageFile = images.carpool.uri;
    }else if (filename === 'collectibles') {
      imageFile = images.collectibles.uri;
    }else if (filename === 'company') {
      imageFile = images.company.uri;
    }else if (filename === 'dancing') {
      imageFile = images.dancing.uri;
    }else if (filename === 'elderly') {
      imageFile = images.elderly.uri;
    }else if (filename === 'exchange') {
       imageFile = images.exchange.uri;
    }else if (filename === 'food') {
       imageFile = images.food.uri;
    }else if (filename === 'gaming') {
       imageFile = images.gaming.uri;
    }else if (filename === 'give') {
       imageFile = images.give.uri;
    }else if (filename === 'icons8-business') {
       imageFile = images.icons8business.uri;
    }else if (filename === 'icons8-controller') {
       imageFile = images.icons8controller.uri;
    }else if (filename === 'icons8-dancing_party') {
       imageFile = images.icons8dancing_party.uri;
    }else if (filename === 'icons8-football') {
       imageFile = images.icons8football.uri;
    }else if (filename === 'icons8-inout') {
       imageFile = images.icons8inout.uri;
    }else if (filename === 'icons8-movie_projector') {
       imageFile = images.icons8movie_projector.uri;
    }else if (filename === 'icons8-novel') {
       imageFile = images.icons8novel.uri;
    }else if (filename === 'icons8-paint_palette') {
       imageFile = images.icons8paint_palette.uri;
    }else if (filename === 'icons8-party_baloon') {
       imageFile = images.icons8party_baloon.uri;
    }else if (filename === 'museum') {
       imageFile = images.museum.uri;
    }else if (filename === 'party') {
       imageFile = images.party.uri;
    }else if (filename === 'pro') {
       imageFile = images.pro.uri;
    }else if (filename === 'romantic') {
       imageFile = images.romantic.uri;
    }else if (filename === 'shopping') {
       imageFile = images.shopping.uri;
    }else if (filename === 'sport') {
       imageFile = images.sport.uri;
    }else if (filename === 'tourist') {
       imageFile = images.tourist.uri;
    }else if (filename === 'cinema') {
       imageFile = images.cinema.uri;
    }else if (filename === 'music') {
       imageFile = images.music.uri;
    }else if (filename === 'fashion') {
       imageFile = images.fashion.uri;
    }else if (filename === 'health') {
       imageFile = images.health.uri;
    }else if (filename === 'pro') {
       imageFile = images.pro.uri;
    }else if (filename === 'training') {
       imageFile = images.training.uri;
     }else if (filename === 'parent') {
        imageFile = images.parent.uri;
    }else{
       imageFile = images.icons8business.uri;
    }
  return imageFile;
}

function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

export function generatorMessageID() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}


export function getNewFlag(createdAt){
  const startDate = moment(createdAt);
  const timeEnd = moment(new Date().getTime());
  const diff = timeEnd.diff(startDate);
  const diffDuration = moment.duration(diff);
  // console.log("Hours:", diffDuration.hours());
  if(diffDuration.days() >= 1){
    return false;
  }else
    return true
}
