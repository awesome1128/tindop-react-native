import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import * as RNIap from 'react-native-iap';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import moment from 'moment';

import I18n from '../i18n/index';
import LogoHeader from '../components/logoHeader';
import YellowButton from '../components/yellowButton';
import firebaseService from '../services/firebase';

const dbRef = firebaseService.database();

const shopProducts = Platform.select({
 ios: [
  '100D',
	'50D',
	'25D',
	'10D',
 ],
 android: [
	'100D',
 	'50D',
 	'25D',
 	'10D',
 ]
});

export default class Shop extends Component {

	constructor(props) {

		super(props);

		let shopContent = [
							{
								name: I18n.t("diamonds", {number: '100'}),
								productId: '100D',
								description: I18n.t('description100D'),
								price: '24,90',
								quantity: '100',
								image: require('../../assets/shop/100.png'),
							},
							{
								name: I18n.t('diamonds', {number: '50'}),
								productId: '50D',
								description: I18n.t('description50D'),
								price: '20,90',
								quantity: '50',
								image: require('../../assets/shop/50.png'),
							},
							{
								name: I18n.t('diamonds', {number: '25'}),
								productId: '25D',
								description: I18n.t('description25D'),
								price: '14,90',
								quantity: '25',
								image: require('../../assets/shop/25.png'),
							},
							{
								name: I18n.t('diamonds', {number: '10'}),
								productId: '10D',
								description: I18n.t('description10D'),
								price: '9,90',
								quantity: '10',
								image: require('../../assets/shop/10.png'),
							},
		]

    this.state = {
			diamondCounts: window.currentUser['diamondCounts'],
			shopContent: shopContent,
			currentItem: 0,
			currentName: shopContent[0].name,
			currentDescription: shopContent[0].description,
			currentPrice: shopContent[0].price,
			currentImage: shopContent[0].image,
			currentQuantity: shopContent[0].quantity,
    };

	}

	async componentDidMount() {

    try {
      const result = await RNIap.initConnection();
      console.log('result', result);
			this.getProducts();
    } catch (err) {
      console.warn(err.code, err.message);
    }

  }

	getProducts = async() => {
    try {

      const products = await RNIap.getProducts(shopProducts);
      console.log('Products', products);

    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

	setProduct(key){

		let {shopContent} = this.state;

		this.setState({
			currentItem: key,
			currentName: shopContent[key].name,
			currentDescription: shopContent[key].description,
			currentPrice: shopContent[key].price,
			currentImage: shopContent[key].image,
			currentQuantity: shopContent[key].quantity,
		});

	}

	buyProduct = async() => {

		const userItem = window.currentUser;
		const diamondCounts = userItem['diamondCounts'];
		const userID = userItem['userID'];

		let productId = this.state.shopContent[this.state.currentItem].productId;

		try {
			const purchase: any = await RNIap.buyProduct(productId);

			userItem['diamondCounts'] = parseInt(diamondCounts) + parseInt(this.state.currentQuantity);
			window.currentUser = userItem;
			dbRef.ref('UsersList/'+userID).update(userItem);

			this.setState({diamondCounts: userItem['diamondCounts']})

			console.log("Success buying product");

		} catch (err) {
			console.warn(err.code, err.message);
			const subscription = RNIap.addAdditionalSuccessPurchaseListenerIOS(async (purchase) => {
				console.log("fail");
			});
		}

	}

  render() {

    return (
      <View
				style={{flex: 1, flexDirection: 'row', backgroundColor: '#161616', padding: 20}}
			>

				<LinearGradient
					colors={['#272527', 'transparent']}
					locations={[0,1]}
					style={{position:'absolute', right:0, left:0, top: 0, height: responsiveHeight(50)}}>
				</LinearGradient>

				<LogoHeader
					onPress={()=> Actions.pop()}
					displayLogo={false}
					position='absolute'
					displayGradient={false}
					text={

						<View>

							<Text style={{
			                fontFamily: 'Lato-Regular',
			                fontSize: 18,
			                color: "#898989",
			                textAlign: "center",
											marginBottom: 10,
			              }}
			        >
			          Shop
			        </Text>

							<View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#3e3d3f', width: responsiveWidth(30), padding: 5, paddingLeft: 20, borderRadius: 100}}>

								<Text style={{color: '#f9f9f9', fontFamily: 'Lato-Regular', fontSize: 23, justifyContent: 'center'}}>{this.state.diamondCounts}</Text>

								<AnimatedCircularProgress
								  size={30}
								  width={2.5}
								  fill={90}
								  tintColor="#f9f9f9"
								  onAnimationComplete={() => console.log('onAnimationComplete')}
								  backgroundColor="#8a898a"
								>
									{
								    (fill) => (
											<Image source={require('../../assets/main/mainYellowDiamond.png')} style={{width: 13, height: 13}}/>
								    )
								  }
								</AnimatedCircularProgress>

							</View>

							<View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(30)}}>

								<Text style={{color: '#fdc810'}}>+1</Text>

								<Image source={require('../../assets/main/mainYellowDiamond.png')} style={{width: 15, height: 15}}/>

								<Text style={{color: '#898989'}}>05:00</Text>

							</View>

						</View>

					}
				/>

				<View style={{flex: 3, justifyContent: 'center'}}>

					<Image source={this.state.currentImage} style={{width: responsiveWidth(43), height: responsiveWidth(43), marginBottom: responsiveHeight(2)}}/>

					<Text style={{fontFamily: 'Lato-Bold', fontSize: 30, color: '#f9f9f9', marginBottom: 16}}>{this.state.currentName}</Text>

					<Text style={{color: '#8a898a', fontSize: 18, lineHeight: 30}}>{this.state.currentDescription}</Text>

					<TouchableOpacity
						onPress={() => this.buyProduct()}
					>
						<LinearGradient
							colors={ ["#FDC810", "#FDE256"]}
							start={{x: 0, y: 0}} end={{x: 1, y: 0}}
							style={{backgroundColor: '#f7ce46', width: responsiveWidth(45), borderRadius: 100, padding: 10, paddingLeft: 30, paddingRight: 30, marginTop: responsiveHeight(5)}}
						>
							<Text style={{fontFamily: 'Lato-Regular', textAlign: 'center', fontSize: 25, color: '#000000'}}>{this.state.currentPrice}€</Text>
						</LinearGradient>
					</TouchableOpacity>

				</View>

				<ScrollView style={{zIndex: 400, flex: 1, paddingTop: responsiveHeight(5), paddingBottom: responsiveHeight(5)}}>

					{this.state.shopContent.map((item, key) =>

							<TouchableOpacity
								onPress={() => this.setProduct(key)}
								style={{height: responsiveWidth(30), width: responsiveWidth(20), alignItems:'center', marginTop: responsiveHeight(2), marginBottom: responsiveHeight(2)}}
							>

								<Image resizeMode='contain' source={item.image} style={{width: responsiveWidth(20), height: responsiveWidth(20)}}/>

								<Text style={{
									fontFamily: this.state.currentItem == key ? 'Lato-Bold' : 'Lato-Regular',
									color: this.state.currentItem == key ? '#f9f9f9' : '#8a898a',
									fontSize: 20}}
								>
									x{item.quantity}
								</Text>

							</TouchableOpacity>

						)
					}

				</ScrollView>

      </View>
    )
  }


}
