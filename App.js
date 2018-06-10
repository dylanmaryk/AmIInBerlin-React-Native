import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      return fetch('https://amiinberlin.vapor.cloud/' + position.coords.latitude + '/' + position.coords.longitude)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          inBerlin: responseJson
        });
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>{this.state.inBerlin ? "You're in Berlin" : "You're not in Berlin"}</Text>
      </View>
    );
  }
}
