import React from 'react';
import { connect } from 'react-redux'
import { LocalAuthentication, FacebookAuth, GoogleAuth } from '../../container/actions/auth';
import FacebookLogin from 'react-facebook-login';
import { FBClientID, GoogleClientID } from '../../container/constants';
import GoogleLogin from 'react-google-login';
import { Modal } from 'react-bootstrap'

class AuthModal extends React.Component{
  state = {
    accountType: "Buyer",
    email: "",
    password: "",
    fbLoginAs: {}
  }


  handleChange = e => this.setState({[e.target.name]: e.target.value})

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;

    this.props.LocalAuthentication({ email, password })
  }

  responseFacebook = (response) => {
    this.setState({
      fbLoginAs: response
    });
    this.props.FacebookAuth(response)
  };

  responseGoogle = (response) => {
    this.props.GoogleAuth(response)
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.onHide()}>
        <div className="modal-content">
          <div className="close-btn">
            <button
              type="button"
              className="close"
              onClick={() => this.props.onHide()}
            >
              <span>&times;</span>
            </button>
          </div>
          {/* modal first modal body */}
          <div className="modal-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className={`nav-link ${this.state.accountType ===
                    'Buyer' && 'active'}`}
                  onClick={() =>
                    this.setState({
                      accountType: 'Buyer',
                    })
                  }
                >
                  Buyer
                </a>
              </li>
              <li className="nav-item">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className={`nav-link ${this.state.accountType ===
                    'Dealer' && 'active'}`}
                  onClick={() =>
                    this.setState({
                      accountType: 'Dealer',
                    })
                  }
                >
                  Dealer
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="from-wrapper">
                  <h5>Login as {this.state.accountType}</h5>

                  <form>
                    <div className="form-group">
                      <label className="control-label" htmlFor="email">
                        <i className="far fa-envelope" />
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        name="email"
                        type="text"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group form-lm">
                      <label className="control-label" htmlFor="password">
                        <i className="fas fa-lock" />
                      </label>
                      <input
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="check-btn form-lm">
                      <div className="input-check">
                        <input type="checkbox" name="rememberPass" />
                        <label htmlFor="rememberPass">Remember Me</label>
                      </div>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a href="#" className="forget-pass">
                        Forgot Password?
                      </a>
                    </div>
                    {this.props.token === false && 'Something error'}
                    <div className="text-center submit">
                      <button
                        className="btn btn-lg from-btn"
                        onClick={this.handleSubmit}
                      >
                        SIGN IN <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                  </form>
                  {this.state.accountType === 'Buyer' &&
                  <React.Fragment>
                    <div className="modal-underline">
                      <div className="signin-option">
                        <p>or sign in with</p>
                      </div>
                    </div>
                    <div className="modal-btn-group text-center social-btn">
                      <FacebookLogin
                        appId={FBClientID}
                        // autoLoad={true}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        redirectUri="www.dealstryker.com/oauth/facebook/callback"
                        icon={<i className="fa fa-facebook" />}
                        textButton={
                          this.state.fbLoginAs.name || 'Login with facebook'
                        }
                      />

                      <GoogleLogin
                        clientId={GoogleClientID}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        buttonText="Login with Google"
                        cookiePolicy={'single_host_origin'}
                        uxMode="popup"
                        redirectUri="www.dealstryker.com/oauth/google/callback"
                        icon={<i className="fab fa-google" />}
                        textButton={
                          this.state.fbLoginAs.name || 'Sign in with Google'
                        }
                        className="go-color"
                        // render={renderProps => (
                        //   <a className="btn btn-lg sign-btn go-color w-100" onClick={renderProps.onClick} href="#"><i className="fab fa-google"></i><span className="sign-text">Sign in with Google</span></a>
                        //   // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                        // )}
                      />
                    </div>
                  </React.Fragment>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <span className="footer-text">Already have an account?</span>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="btn btn-lg from-btn" href="#">
              SIGN IN <i className="fas fa-long-arrow-alt-right" />
            </a>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  LocalAuthentication: (payload) =>  dispatch(LocalAuthentication(payload)),
  FacebookAuth: (payload) => dispatch(FacebookAuth(payload)),
  GoogleAuth: (payload) => dispatch(GoogleAuth(payload))
})

export const LoginModal = connect(mapStateToProps, mapDispatchToProps)(AuthModal);
