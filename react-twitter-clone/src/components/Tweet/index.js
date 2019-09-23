import React, { Component } from 'react';
import PropTypes from 'prop-types';

import like from '../../assets/like.svg';
import './styles.css';

import api from '../../services/api';

class Tweet extends Component {
  handleLike = async () => {
    const { tweet } = this.props;
    await api.post(`likes/${tweet.id}`);
  };

  render() {
    const { tweet } = this.props;

    return (
      <li className="tweet">
        <strong>{tweet.author}</strong>
        <p>{tweet.content}</p>
        <button type="button" onClick={this.handleLike}>
          <img src={like} alt="alt" />
          {tweet.likes}
        </button>
      </li>
    );
  }
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
};

export default Tweet;
