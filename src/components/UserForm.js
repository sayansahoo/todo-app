import React, { Component } from "react";
import { Form, Input } from "antd";
import styled from "styled-components";
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

  componentDidMount () {
    console.log(this.props.userRecords, 'form ref')
    this.formRef.current.setFieldsValue({
      Userame: this.props.userRecords.name,
      email: this.props.userRecords.email
    })
  }
  componentDidUpdate () {
    console.log(this.props.userRecords, 'form ref')
    this.formRef.current.setFieldsValue({
      Username: this.props.userRecords.name,
      email: this.props.userRecords.email
    })
  }

  render() {
    return (
      <Form name="basic" ref={this.formRef}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!"
            }
          ]}
        >
          <Input type="string" onChange={e => this.onChange(e, "name")} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
        >
          <Input type="email" onChange={e => this.onChange(e, "email")} />
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(UserForm);
