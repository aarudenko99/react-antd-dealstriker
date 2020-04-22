import {bindActionCreators} from "redux";
import {actions as authActions} from "../../store/auth";
import {connect} from "react-redux";
import React from "react";
import {Redirect, Route, Switch} from "react-router";

import { Home } from './views/Home';
import { NotFound } from './views/NotFound';
import { AboutUs } from './views/AboutUs';
import { Terms } from './views/Terms';
import { ContactUs } from './views/ContactUs';
import { Privacy } from './views/Privacy';

import { EasterEgg } from './views/EasterEgg';
import {Footer, Header} from "./common";

class LandingPage extends React.Component {
  render() {
    const { history, isDealer, actions} = this.props;
    const token = localStorage.getItem('token');

    return (
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/about" component={AboutUs} />
            <Route exact path="/contact" component={ContactUs} />

            <Route exact path="/easteregg" component={EasterEgg} />
            <Route exact path="/" component={Home} />
            <Route path="/" component={NotFound} />
          </Switch>
          <Footer />
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { decodedJWT } = state.loginForm;
  return {
    isDealer: decodedJWT && decodedJWT.role === 'dealer'
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
