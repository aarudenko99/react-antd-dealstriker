import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from "../../components/LoginForm";
import { actions as authActions } from '../../store/auth/index';
import {Header} from "../LandingPage/common";
import Footer from "../../components/Footer";
import './style.css';

class LoginPage extends React.Component {
    render() {
        const { history, actions, isLoading, error } = this.props;
         return (
             <React.Fragment>
               <Header />
               <section className="login">
                 <LoginForm
                     history={history}
                     onLogin={actions.logIn}
                     resetPasswordRequest={actions.resetPasswordRequest}
                     isLoading={isLoading}
                     error={error}
                 />
               </section>
               <Footer />
             </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { isLoading, error } = state.loginForm;
    return {
        isLoading,
        error,
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      ...authActions,
    }, dispatch),
  });


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
