import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';

const PasswordForgetPage = () => (
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>
)

const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    event.preventDefault();

    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render(){
    const {
      email,
      error
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState({ 'email': event.target.value})}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {!!error && error}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>
)

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink
}
