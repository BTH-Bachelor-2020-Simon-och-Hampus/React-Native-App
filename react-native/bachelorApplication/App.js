import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, View, Text, Button} from 'react-native';

import Home from './components/views/index';

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button 
				title='Suck my dick' 
				onPress={() => navigation.navigate('Home')}></Button>
		</View>
	);
};

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Authorization" component={HomeScreen} />
				<Stack.Screen options={{ headerLeft: null }}  name="Home" component={Home} independent='true' />
			</Stack.Navigator>
		</NavigationContainer>);
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
	},
});
