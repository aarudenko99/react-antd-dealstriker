import React from 'react';
import { connect } from 'react-redux';
import logo from '../../../assets/img/logo.png';
import { history } from '../../../history';

const styles = {
buy: {
  width: "100%",
  color: "#2EA4DB"
},
niceBlue: {
  color: "#2EA4DB"
},
niceLogo: {
  width:"27%"
}

}

class View extends React.Component {
  redirectToLogin = () => history.push('/login');
  redirectToRegistration = () => history.push('/signup');

  render() {
    return (
      <header className="bg-nav" id="header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light ">
                <a className="p-0 navbar-brand navbar-logo-small-screen" href="/">
                  <img style={styles.niceLogo} className="nav-logo" src={logo} alt="logo" />
                </a>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button> */}

                {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                {/*  <h3 style={styles.buy} className="nav-item"> The Better Way to Buy</h3> */}
                <div  className="w-100 d-flex justify-content-end" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <React.Fragment>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          onClick={this.redirectToLogin}
                          style={styles.niceBlue}> Login</button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          onClick={this.redirectToRegistration}
                          style={styles.niceBlue} > Signup </button>
                      </li>
                    </React.Fragment>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapState = (state) => ({
});

const mapDispatch = dispatch => ({
});

export const Header = connect(mapState, mapDispatch)(View);
