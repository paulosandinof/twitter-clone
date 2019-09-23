import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import socket from 'socket.io-client';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Tweet from '../../components/Tweet';
import styles from './styles';

import api from '../../services/api';

class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Início',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon style={{ marginRight: 20 }} name="add-circle-outline" size={24} color="#4BB0EE" />
      </TouchableOpacity>
    ),
  });

  state = {
    tweets: [],
  };

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket('http://10.0.0.102:3000');

    io.on('tweet', (data) => {
      const { tweets } = this.state;
      this.setState({ tweets: [data, ...tweets] });
    });

    io.on('like', (data) => {
      const { tweets } = this.state;
      this.setState({
        tweets: tweets.map(tweet => (tweet._id === data._id ? data : tweet)),
      });
    });
  };

  render() {
    const { tweets } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    );
  }
}

export default Timeline;
