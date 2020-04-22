import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SettingsModal from "../../components/SettingsModal";
import { actions as authActions } from '../../store/auth/index';
import { actions as settingsActions } from '../../store/settings/index';
import { actions as userActions } from '../../store/user/index';

const mapStateToProps = state => {
  const { isSendingPass, error, decodedJWT } = state.loginForm;
  const { isOpen, isSaving, notificationsType, error: notificationsError } = state.settings;
  const { isLoading: isLoadingData, userData: { notificationsType: notificationsTypeInitial } = {} } = state.user;
  return {
    isSendingPass,
    error,
    isOpen,
    email: decodedJWT && decodedJWT.email,
    isSaving,
    notificationsType,
    notificationsError,
    isLoadingData,
    notificationsTypeInitial,
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions,
    ...settingsActions,
    ...userActions,
  }, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
