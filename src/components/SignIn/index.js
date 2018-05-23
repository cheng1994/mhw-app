import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import './index.css';

const SignInPage = ({ history }) => (
  <div className="signIn">
    <h1 className="signIn__title">Sign In</h1>
    <SignInForm className="signIn__form" history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password
    } = this.state;

    const {
      history
    } = this.props;

    event.preventDefault();

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const {
      email,
      password,
      error
    } = this.state;

    const isInvalid =
      password === '' ||
      email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="signIn__input"
          value={email}
          onChange={event => this.setState({ 'email': event.target.value })}
          type="text"
          placeholder="Email Address"
        />
        <input
          className="signIn__input"
          value={password}
          onChange={event => this.setState({ 'password': event.target.value })}
          type="password"
          placeholder="Password"
        />
        <button className="signIn__button" disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm
}
