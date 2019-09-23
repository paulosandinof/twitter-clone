import React, { Component } from 'react';
import PropTypes from 'prop-types';

import twitterLogo from '../../assets/twitter.svg';
import './styles.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    const { username } = this.state;

    if (!username.length) return;

    localStorage.setItem('@TwitterClone:username', username);

    const { history } = this.props;
    history.push('/timeline');
  };

  handleInputChange = event => {
    this.setState({ username: event.target.value });
  };

  render() {
    const { username } = this.state;

    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="TwitterClone" />
        <form onSubmit={this.handleSubmit}>
          <input
            value={username}
            onChange={this.handleInputChange}
            placeholder="Nome de usuário"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
