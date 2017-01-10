import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {browserHistory} from 'react-router';

import {signIn} from '../modules/actions';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const customContentStyle = {
  width: '75%',
  maxWidth: 'none',
  height: '50%'
};

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn() {
    axios.post('/login', {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    });
    let {dispatch} = this.props;
    let user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    }
    dispatch(signIn(user));
  }

  render() {
    const actions = [
      <RaisedButton
        label='Sign In'
        fullWidth={true}
        onTouchTap={() => this.handleSignIn()}
      />
    ];

    return (
      <Dialog
        title='Welcome to GuestBook! Please sign in'
        actions={actions}
        modal={true}
        contentStyle={customContentStyle}
        open={true}
      >
        <TextField
          ref='email'
          hintText='Email Address'
          fullWidth={true}
        />
        <br />
        <TextField
          ref='password'
          hintText='Password'
          fullWidth={true}
          type='password'
        /> 
      </Dialog>
    );
  }
}

export default connect()(LoginContainer);
