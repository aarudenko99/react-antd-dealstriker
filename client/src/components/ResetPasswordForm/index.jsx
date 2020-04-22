import React from 'react'
import PropTypes from 'prop-types'
import {Form, Modal} from 'antd';
import Content from './content'
import './style.css'

const ResetPasswordForm = (props) => {
    const {visible, onCancel, footer} = props;
    return (
        <Modal title='Reset Password'
               className="resetPasswordFormModal"
               visible={visible}
               onCancel={onCancel}
               footer={footer}
               centered
        >
            <Content {...props}/>
        </Modal>
    )
};

ResetPasswordForm.propTypes = {
    visible: PropTypes.bool,
    userName: PropTypes.string,
    onCancel: PropTypes.func,
    onSend: PropTypes.func,
};

ResetPasswordForm.defaultProps = {
    visible: false,
    userName: '',
    onCancel: () => {},
    onSend: () => {},
};

export default ResetPasswordForm;
