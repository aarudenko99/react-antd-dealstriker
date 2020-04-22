import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Icon, Radio, Select } from "antd";
import FacebookLogin from "react-facebook-login";
import {facebookClientId, googleClientId} from "../../socialCredits";
import GoogleLogin from "react-google-login";
import {Header} from "../../containers/LandingPage/common";
import Footer from "../../components/Footer";
import {sortManufacturersByName} from "./utils";
import "./style.css";


class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeRegistration: 'customer',
            selectorMode: 'default'
        };
    }

    componentDidMount() {
        const { actions: { getManufacturers } } = this.props;
        getManufacturers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { form } = this.props;
        if (this.props.error && this.props.error !== prevProps.error)
            form.setFields({
                password: {
                    errors: [new Error('Error while registering')]
                }
            })
    }

    handleSubmit = e => {
        const { form, actions } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { email, password, role, name, zip, manufacturers } = values;
                actions.signUp({
                    email,
                    password,
                    role,
                    name,
                    zip,
                    manufacturers
                });
            }
        });
    };

    onChangeRadioGroup = (e) => {
        this.setState({ typeRegistration: e.target.value })
    };

    onChangeSelect = (e) => {
        const linkedManufacturers = [['Dodge', 'Jeep', 'RAM', 'Chrysler'], ['Fiat', 'Alfa Romeo']];
        const { form } = this.props;
        const { selectorMode } = this.state;
        linkedManufacturers.forEach((arr) => {
            if (arr.indexOf(e) !== -1) {
                this.setState( { selectorMode: 'multiple' }, () =>
                    form.setFieldsValue({ manufacturers: arr }));
            }
        });
        if (Array.isArray(e) && e.length !== 4 && e.length !== 2 && selectorMode !== 'default') {
            this.setState( { selectorMode: 'default' }, () =>
                form.setFieldsValue({ manufacturers: undefined }));
        }
    };

    renderDealerItems = () => {
        const { manufacturers, form } = this.props;
        const { getFieldDecorator } = form;
        const { selectorMode } = this.state;
        const color = 'rgba(0,0,0,.25)';
        return (
            <React.Fragment>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input dealer name!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color }} />}
                            type="text"
                            placeholder="Dealership Name"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('manufacturers', {
                        rules: [{
                            required: true,
                            message: 'Please select at least one manufacturer!'
                        }],
                    })(
                        <Select
                            mode={selectorMode}
                            placeholder="Manufacturers"
                            onChange={this.onChangeSelect}
                        >
                            {manufacturers && manufacturers.sort(sortManufacturersByName).map((manufacturer) =>
                                <Select.Option key={manufacturer}>{manufacturer}</Select.Option>)}
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your dealership address!' }],
                    })(
                        <Input
                            prefix={<Icon type="home" style={{ color }} />}
                            type="text"
                            placeholder="Street Address"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('zip', {
                        rules: [{ required: true, message: 'Please input your zip code!' },
                            {
                                pattern: /^[0-9\b]+$/,
                                message: "Passwords should have at least 8 characters, a capitalized letter, a number as well as special character."
                            }],
                    })(
                        <Input
                            prefix={<Icon type="compass" style={{ color }} />}
                            type="text"
                            placeholder="Zip code"
                        />,
                    )}
                </Form.Item>
            </React.Fragment>
        )
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    render() {
        const { actions: { logIn }, isLoading } = this.props;
        const { typeRegistration } = this.state;
        const { getFieldDecorator } = this.props.form;
        const color = 'rgba(0,0,0,.25)';

        return (
            <React.Fragment>
                <Header />
                <section className="registration">
                    <div className="registration-wrapper">
                        <Form onSubmit={this.handleSubmit} className="RegistrationPage">
                            <h2  className="RegistrationPage-title">Signup</h2>
                            <Form.Item>
                                {getFieldDecorator('role', {
                                    initialValue: "customer",
                                })(
                                    <Radio.Group onChange={this.onChangeRadioGroup}>
                                        <Radio.Button value="customer">Customer</Radio.Button>
                                        <Radio.Button value="dealer">Dealer</Radio.Button>
                                    </Radio.Group>,
                                )}
                            </Form.Item>

                            {this.state.typeRegistration === 'dealer' && this.renderDealerItems()}

                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please input your E-mail!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="mail" style={{ color }} />}
                                        type="email"
                                        placeholder="E-mail"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your Password!',

                                    }, {
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Passwords should have at least 8 characters, a capitalized letter, number as well as special character."
                                    }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('confirmPassword', {
                                    rules: [
                                        { required: true, message: 'Confirm your password!' },
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
                                        placeholder="Confirm password"
                                    />,
                                )}
                            </Form.Item>
                            <Button loading={isLoading} type="primary" htmlType="submit" className="RegistrationPage-btn">
                                Sign up
                            </Button>
                            Or <a href="/login">login now!</a>
                            { typeRegistration === 'customer' ? <div className="socials">
                                <FacebookLogin
                                    appId={facebookClientId}
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    onClick={this.componentClicked}
                                    callback={(socialResp) => logIn({
                                        socialName: 'facebook',
                                        socialResp
                                    })}
                                />
                                <GoogleLogin
                                    clientId={googleClientId}
                                    onSuccess={(socialResp) => logIn({
                                        socialName: 'google',
                                        socialResp
                                    })}
                                    onFailure={(err) => console.log('Error google auth: ', err)}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div> : null}
                        </Form>
                    </div>
                </section>
                <Footer />
            </React.Fragment>
        );
    }
}

RegistrationPage.propTypes = {
    className: PropTypes.string,
    intl: PropTypes.object,
    onSend: PropTypes.func
};

export default Form.create({ name: "registration" })(RegistrationPage);
