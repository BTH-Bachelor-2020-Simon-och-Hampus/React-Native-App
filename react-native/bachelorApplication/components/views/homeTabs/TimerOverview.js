import React, { Component } from 'react'
import { Text, View, Button, FlatList, StyleSheet, List} from 'react-native'
import DeviceInfo from 'react-native-device-info';

export default class TimerOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uniqueId: DeviceInfo.getUniqueId(),
			database: require('../../db/config-db.json'),
			activitis: [],
			numberOfActivities: 0,
			isFetching: false
		};
	}

	componentDidMount(){
		this.findAllActivities()
	}

	async findAllActivities() {
		try {

			this.setState({
				activitis: [],
				numberOfActivities: 0
			})

			fetch('http://' + this.state.database.ip + '/_db/Bachelor/activities_crud/activities', {
				method: "GET",
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				},
			})
			.then((response) => response.json())
			.then((data) => {
				for (let i = 0; i < Object.keys(data).length; i++) {
					if (this.state.uniqueId == data[i].user) {
						this.state.activitis[this.state.numberOfActivities++] = data[i]
					}
				}
			})
			.then(()=> this.onRefresh())
		}	
		catch (error) {
			alert(error);
		}
	}

	onRefresh(){
		this.setState({isFetching: true})
		this.setState({isFetching: false})
	}

	renderItem = ({ item, index }) => {
		return(
			<View  style={styles.flatview}>
				<Text style={styles.name}>{item.activity}</Text>
				<Text style={styles.email}>{item.time}</Text>
			</View>
		)

	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
				data={this.state.activitis}
				renderItem={this.renderItem}
				keyExtractor={item => item._key}
				onRefresh={() => this.onRefresh()}
				refreshing={this.state.isFetching}
			/>
				<Button
					color='#f4511e' 
					title='Update' 
					onPress={() => this.findAllActivities()}>
				</Button>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f2f2f2',
	},
	h2text: {
		marginTop: 10,
		fontFamily: 'Helvetica',
		fontSize: 36,
		fontWeight: 'bold',
	},
	flatview: {
		backgroundColor: 'white',
		alignItems:"center",
		height:80,
		marginTop: "5%",
		marginRight: "20%",
		marginLeft:"20%",
		borderRadius:20,
	},
	name: {
		fontFamily: 'Verdana',
		fontSize: 18,
		marginTop:17,
	},
	email: {
		color: 'green'
	}

  });