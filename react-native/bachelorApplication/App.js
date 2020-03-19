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
				<Stack.Screen name="Authorization" component={Authorization} />
				<Stack.Screen options={{ headerLeft: null }}  name="HomeScreen" component={HomeScreen} independent='true' />
			</Stack.Navigator>
		</NavigationContainer>
		);
}