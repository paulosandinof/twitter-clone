import React, { Component } from 'react';
import socket from 'socket.io-client';

import Tweet from '../../components/Tweet';
import twitterLogo from '../../assets/twitter.svg';
import './styles.css';

import api from '../../services/api';

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      newTweet: '',
    };
  }

  async componentDidMount() {
    this.subscribeToEvent();

    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  subscribeToEvent = () => {
    const io = socket('http://localhost:8080');

    io.on('tweet', data => {
      const { tweets } = this.state;
      this.setState({ tweets: [data, ...tweets] });
    });

    io.on('like', data => {
      const { tweets } = this.state;
      this.setState({
        tweets: tweets.map(tweet => (tweet.id === data.id ? data : tweet)),
      });
    });
  };

  handleInputChange = event => {
    this.setState({ newTweet: event.target.value });
  };

  handleNewTweet = async event => {
    const { newTweet } = this.state;

    if (event.keyCode !== 13) return;

    const content = newTweet;
    const author = localStorage.getItem('@TwitterClone:username');

    await api.post('tweets', { content, author });

    this.setState({ newTweet: '' });
  };

  render() {
    const { tweets, newTweet } = this.state;

    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="TwitterClone" />
        <form>
          <textarea
            value={newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>
        <ul className="tweet-list">
          {tweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Timeline;
