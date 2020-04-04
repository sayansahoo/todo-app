import React, { Component } from "react";
import { DatePicker, Form, Input } from "antd";
import { todoActions } from "../reducers/actions";
import { connect } from "react-redux";
import moment from "moment";

class TodoForm extends Component {
  onChangeDate = (date, dateString) => {
    this.props.dispatch(todoActions.setDate(dateString));
  };

  setAction = (e) => {
    this.props.dispatch(todoActions.setAction(e.target.value));
  };

  render() {
    const dateFormat = "YYYY-MM-DD";
    const date = this.props.todoRecords.date;
    return (
      <Form name="basic">
        <Form.Item
          label="Action"
          name="Action"
          rules={[
            {
              required: true,
              message: "What do you want to do?",
            },
          ]}
        >
          <Input
            defaultValue={this.props.todoRecords.Todo}
            type="string"
            onChange={(e) => this.setAction(e)}
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="Date"
          rules={[
            {
              required: true,
              message: "Please input your Date!",
            },
          ]}
        >
          <DatePicker
            defaultValue={date && moment(date, dateFormat)}
            format={dateFormat}
            onChange={this.onChangeDate}
          />
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(TodoForm);
