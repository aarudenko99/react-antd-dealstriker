import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Button, Form, Icon, Input} from "antd";
import { actions as authActions } from '../../store/auth/index';
import { Header } from "../LandingPage/common";
import Footer from "../../components/Footer";
import './style.css';

class ResetPasswordPage extends React.Component {
  handleSubmit = e => {
    const { form, actions, history } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { newPassword } = values;
        const urlParams = new URLSearchParams(history.location.search);
        const id = urlParams.get('id');
        const token = urlParams.get('token');

        actions.resetPassword({
          id,
          token,
          newPassword
        });
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
      const { isLoading, form } = this.props;
      const { getFieldDecorator } = form;
       return (
           <React.Fragment>
             <Header />
             <section className="resetPassword">
               <Form onSubmit={this.handleSubmit} className="resetPasswordForm">
                 <h2 className="resetPasswordForm-title">Change password</h2>
                 <Form.Item>
                   {getFieldDecorator('newPassword', {
                     rules: [{ required: true, message: 'Please input your new password!' },
                       {
                         pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                         message: "Passwords should have at least 8 characters, a capitalized letter, number as well as special character."
                       }],
                   })(
                       <Input
                           prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           type="password"
                           placeholder="New Password"
                       />,
                   )}
                 </Form.Item>
                 <Form.Item>
                   {getFieldDecorator('confirmPassword', {
                     rules: [
                         { required: true, message: 'Confirm your new password!' },
                         { validator: this.compareToFirstPassword },
                         {
                           pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                           message: "Passwords should have at least 8 characters, a capitalized letter, number as well as special character."
                         },
                       ],
                   })(
                       <Input
                           prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           type="password"
                           placeholder="Confirm new password"
                       />,
                   )}
                 </Form.Item>
                 <Button loading={isLoading} htmlType='submit' type="primary" className="resetPasswordForm-btn">
                   Submit
                 </Button>
               </Form>
             </section>
             <Footer />
           </React.Fragment>
      );
  }
}

const mapStateToProps = state => {
    const { isResettingPassword, error } = state.loginForm;
    return {
        isLoading: isResettingPassword,
        error,
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      ...authActions,
    }, dispatch),
  });


export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: "login" })(ResetPasswordPage));
