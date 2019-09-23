import React, { Component } from 'react';
import {
  View, SafeAreaView, Text, TouchableOpacity, TextInput, AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

import api from '../../services/api';

class New extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      newTweet: '',
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  };

  handleNewTweet = async () => {
    const { newTweet } = this.state;

    const content = newTweet;

    const author = await AsyncStorage.getItem('@TwitterClone:username');

    await api.post('tweets', { content, author });

    this.goBack();
  };

  handleInputChange = (newTweet) => {
    this.setState({ newTweet });
  };

  render() {
    const { newTweet } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="close" size={24} color="#4BB0EE" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.handleNewTweet}>
            <Text style={styles.buttonText}>Tweetar</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder="O que está acontecendo?"
          value={newTweet}
          onChangeText={this.handleInputChange}
          placeholderTextColor="#999"
          returnKeyType="send"
          onSubmitEditing={this.handleNewTweet}
        />
      </SafeAreaView>
    );
  }
}

New.propTypes = {
  navigation: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }).isRequired,
};

export default New;
