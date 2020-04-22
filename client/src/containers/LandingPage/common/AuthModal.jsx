import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppBar, Tabs, Tab, Modal, Input, Checkbox, FormLabel, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { GoogleClientID, FBClientID } from '@constants';
import { LocalAuthentication } from '@actions';

class Auth extends React.Component {
  state = {
    accountType: "Dealer",
    email: '',
    password: '',
    fbLoginAs: {}
  }

  handleChange = (ev, value) => {
    this.setState({
      accountType: value
    })
  }

  onRememberMe = () => {

  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if(email && password) {
      this.props.LocalAuthentication({email, password})
    } else {
      alert("Email & Password cannot be empty")
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClose = () => {
    this.props.handleClose();
  };

  responseFacebook = (response) => {
    this.setState({
      fbLoginAs: response
    })
  };

  responseGoogle = (response) => {
    console.log(response)
  };

  render() {
    const { classes } = this.props;
    return (
      <Modal
        open={this.props.open}
        onClose={this.handleClose}
      >
        <div id="AuthModal" className={classes.paper}>
          <AppBar position="static" className={classes.tabs}>
            <Tabs
              value={this.state.accountType}
              onChange={this.handleChange}
            >
              <Tab label="Buyer" value="Buyer" />
              <Tab label="Dealer" value="Dealer" />
            </Tabs>
          </AppBar>
          <div className="ModalContent p-3">
            <div className="local-signin">
              <div className="card-header">
                <h3 className="text-center">Login as {this.state.accountType}</h3>
              </div>
              <form onSubmit={this.onSubmit}>
              <div className="my-4">
                <Input
                  placeholder="Email"
                  className="d-block mt-3"
                  name="email"
                  onChange={this.onChange}
                  required
                />
                <Input
                  placeholder="Password"
                  className="d-block mt-3"
                  name="password"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <Checkbox
                    id="Remember"
                    className="p-0 mr-2"
                    style={{color: 'purple'}}
                    name="remember"
                    onChange={this.onRememberMe}
                  />
                  <FormLabel
                    htmlFor="Remember"
                    className="m-0"
                  >
                    Remember Me
                  </FormLabel>
                </div>
                <Link to="/forget-password">Forget Password?</Link>
              </div>

              <div className="text-right">
                <Button
                  id="LoginBtn"
                  onClick={this.onSubmit}
                >Sign In</Button>
              </div>
              </form>
            </div>

            <div className="social-signin">
              <div className="alternative">
                <h4>Or sign in with</h4>
              </div>
              <div className="social-btn">
                <FacebookLogin
                  appId={FBClientID}
                  autoLoad={true}
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook}
                  redirectUri="www.dealstryker.com/oauth/facebook/callback"
                  icon={<i className="fa fa-facebook"></i>}
                  textButton={this.state.fbLoginAs.name || "Login with facebook"}
                />

                <GoogleLogin
                  clientId={GoogleClientID}
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  buttonText="Login with Google"
                  cookiePolicy={'single_host_origin'}
                  uxMode="redirect"
                  redirectUri="www.dealstryker.com/oauth/google/callback"
                />
              </div>
            </div>

            <div className="form-footer">
              <div>Don't have an account <Link to="register">Sign Up</Link></div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: "transparent",
    boxShadow: 'none',
    outline: 'none',
  },
  tabs: {
    outline: 'none'
  }
});

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  LocalAuthentication: (payload) => dispatch(LocalAuthentication(payload))
})

export const AuthModal = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Auth));
