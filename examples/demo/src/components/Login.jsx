import React, { Component } from "react";
import { actions, connect } from "candee";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Icon from "antd/lib/icon";
import Form from "antd/lib/form";
import "./Login.css";

const FormItem = Form.Item;

class Login extends Component {
  componentWillReceiveProps(nextprops) {
    const { result } = nextprops.states;
    console.log(result);
    if (result && result.code === 200) {
      actions.routing.push("/home");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        actions.login.loginRequest(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h2 style={{ textAlign: "center" }}>Candee</h2>
        <FormItem>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="admin"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="admin123"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(Login);

export default connect(state => {
  return { states: state.login };
})(LoginForm);
