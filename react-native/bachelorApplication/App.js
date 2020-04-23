import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/views/HomeScreen';
import Authorization from './components/views/Authorization'

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{ 
					headerLeft: null, 
					title: '',
					headerStyle: {
						backgroundColor: '#f4511e',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
						alignItems:'center',
					}, 
				}}	name="Authorization" component={Authorization} />
				<Stack.Screen options={{ 
					headerLeft: null, 
					title: '',
					headerStyle: {
						backgroundColor: '#f4511e',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
						alignItems:'center',
					}, 
				}}	name="HomeScreen" component={HomeScreen} independent='true' />
			</Stack.Navigator>
		</NavigationContainer>
	);
}