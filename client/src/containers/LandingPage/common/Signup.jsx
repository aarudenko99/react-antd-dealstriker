import React from "react";
import { connect } from "react-redux";
import { SelectOption } from "./SelectOption";
import { LocalSignUp } from "../../container/actions/auth";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { FBClientID, GoogleClientID } from "../../container";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

class AuthModal extends React.Component {
  state = {
    accountType: "Buyer",
    step: 0,
    car_models: [],
    fbLoginAs: {}
  };

  handleChangeSelect = value => {
    this.setState({
      car_models: value
    });
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    if (email && password) {
      this.props.LocalSignUp({
        email,
        password
        // role: this.state.accountType
      });
    } else {
      alert("Cannot submit without email and password");
    }
  };
  responseFacebook = response => {
    this.setState({
      fbLoginAs: response
    });
    this.props.FacebookAuth(response);
    // console.log(response)
  };

  responseGoogle = response => {
    this.props.GoogleAuth(response);
  };
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
          <div className="modal-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <button
                  className={`nav-link ${this.state.accountType === "Buyer" &&
                    "active"}`}
                  onClick={() => {
                    this.setState(() => ({ accountType: "Buyer", step: 0 }));
                  }}
                >
                  Buyer
                </button>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link"
                  onClick={() => this.props.onHide()}
                >
                  Dealer
                </Link>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane show active"
                id="home-sign"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                {this.state.accountType === "Dealer" && (
                  <div className="progessbar-container">
                    <ul className="progessbar">
                      <li className={this.state.step > 1 && "active"}>
                        Step 1
                      </li>
                      <li className={this.state.step > 2 && "active"}>
                        Step 2
                      </li>
                      <li className={this.state.step > 3 && "active"}>
                        Step 3
                      </li>
                    </ul>
                  </div>
                )}
                <div className="from-wrapper">
                  <h5>Signup as {this.state.accountType}</h5>
                  {this.state.step === 2 && (
                    <div className="step-2">
                      <p>Car Brands List:</p>
                      <SelectOption
                        handleChange={this.handleChangeSelect}
                        defaultValue={this.state.car_models}
                      />
                    </div>
                  )}

                  {this.state.step === 1 && (
                    <form>
                      <div className={`form-group`}>
                        <label className="control-label" htmlFor="first-name">
                          <i className="fas fa-pen" />
                        </label>
                        <input
                          className="form-control"
                          id="dealership-name"
                          placeholder="Dealership Name"
                          name="dealership-name"
                          type="text"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label" htmlFor="email">
                          <i className="far fa-address-card" />
                        </label>
                        <input
                          className="form-control"
                          id="street-address"
                          placeholder="Street Address"
                          name="street-address"
                          onChange={this.handleChange}
                          type={"text"}
                        />
                      </div>
                      <div className="form-group form-lm">
                        <label className="control-label" htmlFor="password">
                          <i className="fas fa-map-pin" />
                        </label>
                        <input
                          className="form-control"
                          id="zip-code"
                          placeholder="Zip Code"
                          name="zip-code"
                          type="text"
                          onChange={this.handleChange}
                        />
                      </div>
                    </form>
                  )}

                  {(this.state.step === 0 || this.state.step === 3) && (
                    <form>
                      {/* <div className={`form-group w-47`}>
                          <label className="control-label inline-icon" htmlFor="first-name">
                            <i className="fas fa-user"></i>
                          </label>
                          <input 
                            className="form-control inline-input" 
                            id="first-name" 
                            placeholder="First Name"
                            name="first-name" 
                            type="text"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group w-47 las">
                          <label className="control-label inline-icon" htmlFor="last-name">
                            <i className="fas fa-user"></i>
                          </label>
                          <input 
                            className="form-control inline-input" 
                            id="last-name" 
                            placeholder="Last Name" 
                            name="last-name"
                            onChange={this.handleChange}
                            type="text" 
                          />
                        </div> */}

                      <div className="form-group">
                        <label className="control-label" htmlFor="email">
                          <i className="far fa-envelope" />
                        </label>
                        <input
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          name="email"
                          type="email"
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
                          placeholder={"Password"}
                          name="password"
                          type="password"
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="text-center submit">
                        <button
                          className="btn btn-lg from-btn"
                          onClick={this.handleSubmit}
                        >
                          SIGN UP <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                    </form>
                  )}

                  {(this.state.step === 0 || this.state.step === 3) && (
                    <div>
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
                            this.state.fbLoginAs.name || "Login with facebook"
                          }
                        />

                        <GoogleLogin
                          clientId={GoogleClientID}
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          buttonText="Login with Google"
                          cookiePolicy={"single_host_origin"}
                          uxMode="popup"
                          redirectUri="www.dealstryker.com/oauth/google/callback"
                          icon={<i className="fab fa-google" />}
                          textButton={
                            this.state.fbLoginAs.name || "Sign in with Google"
                          }
                          className="go-color"
                          // render={renderProps => (
                          //   <a className="btn btn-lg sign-btn go-color w-100" onClick={renderProps.onClick} href="#"><i className="fab fa-google"></i><span className="sign-text">Sign in with Google</span></a>
                          //   // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                          // )}
                        />
                      </div>
                      {/* <div className="modal-btn-group text-center">
                          <a className="btn btn-lg  sign-btn fa-color" href="#"><i className="fab fa-facebook-f"></i><span className="sign-text">Sign in with facebook</span></a>
                          <a className="btn btn-lg sign-btn go-color" href="#"><i className="fab fa-google"></i><span className="sign-text">Sign in with Google</span></a>
                        </div> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="fsb">
              <span className="footer-text">Already have an account?</span>
              <button className="btn btn-lg from-btn fr">
                SIGN IN <i className="fas fa-long-arrow-alt-right" />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  LocalSignUp: payload => dispatch(LocalSignUp(payload))
});

export const SignupModal = connect(
  mapState,
  mapDispatch
)(AuthModal);