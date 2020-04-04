import React, { Component } from "react";
import { DatePicker, Form, Input } from "antd";
import styled from "styled-components";
import { todoActions } from "../reducers/actions";
import { connect } from "react-redux";

class TodoForm extends Component {
  onChangeDate = (date, dateString) => {
    this.props.dispatch(todoActions.setDate(dateString));
  };

  setAction = e => {
    this.props.dispatch(todoActions.setAction(e.target.value));
  };

  render() {
    return (
      <Form name="basic">
        <Form.Item
          label="Action"
          name="Action"
          rules={[
            {
              required: true,
              message: "What do you want to do?"
            }
          ]}
        >
          <Input type="string" onChange={e => this.setAction(e)} />
        </Form.Item>

        <Form.Item
          label="Date"
          name="Date"
          rules={[
            {
              required: true,
              message: "Please input your Date!"
            }
          ]}
        >
          <DatePicker onChange={this.onChangeDate} />
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(TodoForm);
