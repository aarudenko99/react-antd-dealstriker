import React from 'react';

import { Form, Input, Button, Icon } from 'antd';


const FormItem = Form.Item;

class ContentForm extends React.Component {
    state = {
        message: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values)

            } else {
                console.error("error validate", err);
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your E-mail!'
                            },
                            {
                                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: 'Input email'
                            }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="text"
                            placeholder="E-mail"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const Content = Form.create({ name: "resetPassword" })(ContentForm);

export default Content
