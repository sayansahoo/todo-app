import React, { Component } from "react";
import { Form, Input } from "antd";
import { connect } from "react-redux";
import { userActions } from "../reducers/actions";

class UserForm extends Component {
  formRef = React.createRef();

  onChange = (e, str) => {
    if (str === "name") {
      this.props.dispatch(userActions.setName(e.target.value));
    } else if (str === "email") {
      this.props.dispatch(userActions.setEmail(e.target.value));
    }
  };

  render() {
    return (
      <Form name="basic" ref={this.formRef}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            defaultValue={this.props.userRecords.name}
            type="string"
            onChange={(e) => this.onChange(e, "name")}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: "Please enter proper email id!",
              validator: (rule, value) => {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                console.log(re, "re");
                console.log(re.test(value), "value");
                if (re.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Please enter proper email id!");
                }
              },
            },
          ]}
        >
          <Input
            defaultValue={this.props.userRecords.email}
            type="email"
            onChange={(e) => this.onChange(e, "email")}
          />
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(UserForm);
