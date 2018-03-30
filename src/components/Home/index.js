import React, { Component } from 'react';

import withAuthorization from '../Session/withAuthorization';
import { user } from '../../firebase';
import UserList from '../UserList';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {}
    };
  }

  componentDidMount() {
    user.onceGetUsers().then(snapshot => {
      console.log(snapshot.val());
      this.setState(() => ({ users: snapshot.val() }))
    }

    );
  }

  render(){
    const { users } = this.props;

    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in User</p>

        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
