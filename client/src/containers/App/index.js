import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Header';
import { Route, Switch, Redirect } from 'react-router-dom'
import { dealerRoutes, customerRoutes } from '../../routes'
import { createSocket, disconnect } from '../App/ws.js'
import './style.css';

import { actions as authActions }  from '../../store/auth';
import { actions as bidsActions }  from '../../store/bids';
import { actions as settingsActions }  from '../../store/settings';
import { actions as userActions } from "../../store/user";
import {sendMessage} from "../App/ws";
import {Form, message} from "antd";
import Footer from "../../components/Footer";

const renderRoutes = ({path, component, exact}) => (
    <Route key={path} exact={exact} path={path} component={component}/>
);

class App extends React.Component {
    constructor(props) {
        super(props);
        props.actions.getJwtDecoded({decodedJWT: localStorage.getItem('token')})
    }

    componentDidMount() {
      const { userId, actions, email } = this.props;
      if (userId) {
        this.startWS();
        actions.getUserData({ email });
      }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      const { userId, actions, email, isLoading } = this.props;
      if (prevProps.userId !== userId) {
        if (userId) {
          this.startWS();
          actions.getUserData({ email });
        }
        else disconnect();
      }
      if (isLoading !== prevProps.isLoading && userId)
        this.createSavedOffer(userId);
    }

    componentWillUnmount() {
      disconnect();
    }

    createSavedOffer = (userId) => {
      const { actions, bids } = this.props;
      const offerRequestProgressJSON = localStorage.getItem('offerRequestProgress');
      let preparedObj = offerRequestProgressJSON ? JSON.parse(offerRequestProgressJSON) : null;
      if (preparedObj) {
        preparedObj.userId = userId;
        sendMessage('OFFER_REQUEST_CREATED', preparedObj, (code, offerRequest) => {
          if (code === 200 && offerRequest) {
            actions.setBids([...bids, offerRequest]);
            message.success(`Offer request created (${ preparedObj.manufacturer } ${ preparedObj.car })`, 10);
            localStorage.removeItem('offerRequestProgress');
          }
          else if (code === 400) {
            message.info("Sorry, we are not in your area yet. Sign up to be notified when we are", 10);
            localStorage.removeItem('offerRequestProgress');
          }
          else if (code === 409) {
            message.error("Limited to 3 bids in a time", 10);
            localStorage.removeItem('offerRequestProgress');
          }
          else message.error("Error during saving offer. Try to refresh page", 10);
        });
      }
    };

    startWS = () => {
      const { actions } = this.props;
      const callbacks = {
        get_userId: () => this.props.userId,
        get_isDealer: () => this.props.isDealer,
        get_props: () => this.props,
        set_bids: actions.setBids,
      };

      createSocket(this.props, callbacks);
    };

    render() {
        const { history, isDealer, actions } = this.props;
        const token = localStorage.getItem('token');

        return (
            token ?
                <React.Fragment>
                  <Header
                      history={history}
                      isDealer={isDealer}
                      actions={actions}
                      onOpenSettings={() => actions.setSettingsVisibility(true)}
                  />
                  <section className="main">
                      <div className="main-content">
                          <Switch>
                              {isDealer ? dealerRoutes.map(route => renderRoutes(route))
                                  : customerRoutes.map(route => renderRoutes(route))
                              }
                          </Switch>
                      </div>
                  </section>
                  <Footer />
                </React.Fragment>
                :
                <Redirect to='/login'/>
        );
    }
}

const mapStateToProps = state => {
    const { decodedJWT } = state.loginForm;
    const { bids = [], loading } = state.bids;
    const { isLoading: isLoadingUserData, unreadLiveBids } = state.user;
    return {
      isDealer: decodedJWT && decodedJWT.role === 'dealer',
      userId: decodedJWT ? decodedJWT.id : null,
      email: decodedJWT && decodedJWT.email,
      bids: bids,
      isLoading: loading,
      isLoadingUserData,
      unreadLiveBids,
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      ...authActions,
      ...bidsActions,
      ...settingsActions,
      ...userActions,
    }, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);
