import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.css';

import SignOutButton from '../SignOut'
import * as routes from '../../constants/routes';

const Navigation = ({ authUser }) => (
  <div className="navigation__container">
    <h1 className="navigation__title">The Research Commission</h1>
    {/* {
      authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    } */}
  </div>
)

Navigation.contextTypes = {
  authUser: PropTypes.object
}

const NavigationAuth = () => (
  <div className="navigation">
    <div className="navigation__item"><Link to={routes.SIGN_IN}>Sign In</Link></div>
    <div className="navigation__item"><Link to={routes.LANDING}>Landing</Link></div>
    <div className="navigation__item"><Link to={routes.HOME}>Home</Link></div>
    <div className="navigation__item"><Link to={routes.ACCOUNT}>Account</Link></div>
    <div className="navigation__item"><SignOutButton /></div>
  </div>
)

const NavigationNonAuth = () => (
  <div className="navigation">
    <div className="navigation__item"><Link to={routes.SIGN_IN}>Sign In</Link></div>
    <div className="navigation__item"><Link to={routes.LANDING}>Landing</Link></div>
  </div>
)

export default Navigation;
