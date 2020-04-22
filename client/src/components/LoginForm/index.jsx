import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Icon, Checkbox, message } from "antd";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { googleClientId, facebookClientId } from "../../socialCredits";
import ResetPasswordForm from "../ResetPasswordForm";
import "./style.css";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        showResetPassword: false
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { form } = this.props;

        if (this.props.error && this.props.error !== prevProps.error)
            form.setFields({
                password: {
                    errors: [new Error('User is not exists or wrong password')]
                }
            })
    }

    handleSubmit = e => {
        const { form, onLogin } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { email, password } = values;
                onLogin({
                    email,
                    password
                });
            }
        });
    };

    handleResetPassword = () => {
        const {showResetPassword} = this.state;
        this.setState({ showResetPassword: !showResetPassword });
    };

    submitResetPassword = (values) => {
        const {resetPasswordRequest} = this.props;
        resetPasswordRequest({ email: values.email });

        this.setState({showResetPassword: false});
        message.success('Check your email');
    };

    render() {
        const { onLogin, isLoading } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-wrapper">
                <Form onSubmit={this.handleSubmit} className="LoginForm">
                    <h2 className="LoginForm-title">Login</h2>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your E-mail!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="email"
                                placeholder="E-mail"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox className="LoginForm-remember">Remember me</Checkbox>)}
                        <a className="LoginForm-forgot" onClick={this.handleResetPassword} >
                            Forgot password
                        </a>
                    </Form.Item>
                    <Button loading={isLoading} type="primary" htmlType="submit" className="LoginForm-btn">
                        Log in
                    </Button>
                    Or <a href="/signup">register now!</a>
                    <div className="socials">
                        <FacebookLogin
                            appId={facebookClientId}
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.componentClicked}
                            callback={(socialResp) => onLogin({
                                socialName: 'facebook',
                                socialResp
                            })}
                        />
                        <GoogleLogin
                            clientId={googleClientId}
                            onSuccess={(socialResp) => onLogin({
                                socialName: 'google',
                                socialResp
                            })}
                            onFailure={(err) => console.log('Error  google auth: ', err)}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Form>

                <ResetPasswordForm
                    visible={this.state.showResetPassword}
                    onSubmit={this.submitResetPassword}
                    onCancel={this.handleResetPassword}
                    footer={null}
                />
            </div>

        )
    }
}

LoginForm.propTypes = {
    className: PropTypes.string,
    intl: PropTypes.object,
    onSend: PropTypes.func
};

export default Form.create({ name: "login" })(LoginForm);
