import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import RegistrationPage from "../RegistrationPage";
import LoginPage from '../LoginPage';
import App from '../App';
import ResetPasswordPage from '../ResetPasswordPage';
import LandingPage from '../LandingPage';
import { DealerSales } from '.././LandingPage/views/DealerSales';
import { connect } from "react-redux";

class Root extends Component {

    render() {
        const { history } = this.props;
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={RegistrationPage} />
                    <Route path="/dash" component={App} />
                    <Route path="/resetPassword" component={ResetPasswordPage} />
                    <Route path="/dealerships" component={DealerSales}/>
                    <Route path="/" component={LandingPage} />
                </Switch>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthorized: !!state.loginForm.decodedJWT,
    }
};

export default connect(mapStateToProps)(Root);
