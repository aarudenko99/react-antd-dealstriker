import React from "react";
import {Button, Icon as AntdIcon, Input, message, Modal, Switch} from 'antd';
import "./style.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.oldPasswordInputRef = React.createRef();
        this.newPasswordInputRef = React.createRef();
        this.confirmPasswordInputRef = React.createRef();
    }

    state = {
        showPasswordChange: false,
        showInitial: true
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isOpen, isSendingPass, error, notificationsTypeInitial } = this.props;
        const { showPasswordChange } = this.state;
        if (prevProps.isOpen !== isOpen && isOpen) {
            this.setState({ showPasswordChange: false });
        }

        if (showPasswordChange && isOpen && prevProps.isSendingPass !== isSendingPass && !isSendingPass) {
            if (!error) message.success('Password changed');
            else message.error(error);
        }
    }

    handleClose = () => {
        const { actions } = this.props;
        actions.setSettingsVisibility(false);
    };

    handleChangeSwitch = (type, val) => {
        const { actions, email } = this.props;
        this.setState({ showInitial: false })
        if (!val) {
            if (type !== 'all') actions.setNotificationsType({email, type: 'all'});
            else actions.setNotificationsType({email, type: 'none'});
        }
        else {
            actions.setNotificationsType({ email, type });
        }
    };

    handleSubmitNewPassword = () => {
        const { actions, email } = this.props;
        const oldPassword = this.oldPasswordInputRef.current.input.value;
        const newPassword = this.newPasswordInputRef.current.input.value;
        const confirmPassword = this.confirmPasswordInputRef.current.input.value;
        const passRegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

        if (newPassword === confirmPassword) {
            if (!passRegExp.test(newPassword))
                return message.error("Passwords should have at least 8 characters, a capitalized letter, number as well as special character.");
            else return actions.changePassword({ email, oldPassword, newPassword });
        }
        else return message.error('New password field must match confirm password field');
    };

    render() {
        const { isOpen, isSendingPass, isSaving, isLoadingData, notificationsType, notificationsTypeInitial } = this.props;
        const { showPasswordChange, showInitial } = this.state;
        return (
            <Modal title='Settings'
                className="SettingsModal"
                visible={isOpen}
                onCancel={this.handleClose}
                footer={null}
                width={500}
            >
                <div className="SettingsModal-controls">
                    <div className="switch"><span>Receive Only Offer Notifications by Email</span><Switch disabled={isSaving} checked={showInitial ? notificationsTypeInitial === 'offer' : notificationsType === 'offer'} loading={isLoadingData || isSaving} onChange={(val) => this.handleChangeSwitch('offer', val)} /></div>
                    <div className="switch"><span>Receive Only Chat Notifications by Email</span><Switch checked={showInitial ? notificationsTypeInitial === 'chat' : notificationsType === 'chat'} loading={isLoadingData || isSaving} onChange={(val) => this.handleChangeSwitch('chat', val)} /></div>
                    <div className="switch"><span>Receive Both Chat and Offer Notifications by Email</span><Switch checked={showInitial ? notificationsTypeInitial === 'all' : notificationsType === 'all'} loading={isLoadingData || isSaving} onChange={(val) => this.handleChangeSwitch('all', val)} /></div>
                    <div className="switch"><span>Receive Neither Chat or Offer Notifications by Email</span><Switch checked={showInitial ? notificationsTypeInitial === 'none' : notificationsType === 'none'} loading={isLoadingData || isSaving} onChange={(val) => this.handleChangeSwitch('none', val)} /></div>
                </div>
                <div className="SettingsModal-passwordChange">
                    {showPasswordChange ?
                        <React.Fragment>
                            <Input ref={this.oldPasswordInputRef} type="password" placeholder="Old password"/>
                            <Input ref={this.newPasswordInputRef} type="password" placeholder="New password"/>
                            <Input ref={this.confirmPasswordInputRef} type="password" placeholder="Confirm password"/>
                            <Button type="primary" loading={isSendingPass} onClick={this.handleSubmitNewPassword}>Submit</Button>
                        </React.Fragment> :
                    <Button type="link" loading={isSendingPass} onClick={() => this.setState({ showPasswordChange: true })}>
                        Change password
                    </Button>}
                </div>
            </Modal>
        )
    }
}

export default Header;
