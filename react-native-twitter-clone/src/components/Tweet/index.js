import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import api from '../../services/api';

class Tweet extends Component {
  static propTypes = {
    tweet: PropTypes.shape({
      _id: PropTypes.string,
      author: PropTypes.string,
      content: PropTypes.string,
      likes: PropTypes.number,
    }).isRequired,
  };

  handleLike = async () => {
    const { tweet } = this.props;

    await api.post(`likes/${tweet._id}`);
  };

  render() {
    const { tweet } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.author}>{tweet.author}</Text>
        <Text style={styles.content}>{tweet.content}</Text>

        <TouchableOpacity onPress={this.handleLike} style={styles.likeButton}>
          <Icon name="ios-heart-empty" size={20} color="#999" />
          <Text style={styles.likeText}>{tweet.likes}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Tweet;
