import React, { Component } from "react";
import { Tabs, Modal, Button, Form, Input } from "antd";
import styled from "styled-components";
import Todos from "./Todos";
import Users from "./Users";
import UserForm from "./UserForm";
import TodoForm from "./TodoForm";
import { connect } from "react-redux";
import { todoActions, userActions } from "../reducers/actions";

const StyledMainContainer = styled.div`
  margin-left: 20px;
`;

const { TabPane } = Tabs;

class TabContent extends Component {
  state = {
    visible: false,
    fieldName: "",
    name: "",
    email: "",
    edit: false,
    userData: [],
  };

  showModal = (e, s) => {
    this.setState({
      visible: true,
      fieldName: s,
    });
  };

  handleTodo = (e) => {
    let data = {
      Todo: this.props.todoReducer.Todo,
      date: this.props.todoReducer.date,
      key: this.props.todoReducer.todoData.length,
    };
    this.props.dispatch(
      todoActions.setData([...this.props.todoReducer.todoData, data])
    );
    this.setState({
      visible: false,
      edit: false,
    });
  };

  handleUser = (e) => {
    const { edit } = this.state;
    if (!edit) {
      let data = {
        name: this.props.userReducer.name,
        email: this.props.userReducer.email,
        key: this.props.userReducer.userData.length,
      };
      this.props.dispatch(
        userActions.setData([...this.props.userReducer.userData, data])
      );
      this.setState({
        visible: false,
        edit: false,
      });
    } else {
      const { userData } = this.props.userReducer;
      const { userKey, name, email } = this.state;
      const found = userData.findIndex((a) => userKey === a.key);
      if (found > -1) {
        let payload = userData;
        payload[found] = {
          name: this.props.userReducer.name,
          email: this.props.userReducer.email,
          key: userKey,
        };
        this.props.dispatch(userActions.setData(payload));
      }
      this.setState({ edit: false, visible: false });
    }
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  callback = (key) => {
    console.log(key);
  };

  handleEdit = (record) => {
    this.setState({
      name: record.name,
      email: record.email,
      userKey: record.key,
      visible: true,
      edit: true,
    });
  };

  triggerModal = (e, s) => {
    this.showModal(e, s);
    this.setState({ name: "", email: "" });
  };

  handleDelete = (record) => {
    const { userData } = this.props.userReducer;
    const payload = userData.filter((a) => a.name !== record.name);
    this.props.dispatch(userActions.setData(payload));
  };

  render() {
    const { visible, fieldName } = this.state;
    return (
      <StyledMainContainer>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Todos" key="1">
            <Todos showModal={this.showModal} />
          </TabPane>
          <TabPane forceRender="true" tab="users" key="2">
            <Users
              triggerModal={this.triggerModal}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
            />
          </TabPane>
        </Tabs>
        {visible && (
          <div>
            <Modal
              title={fieldName}
              visible={this.state.visible}
              onOk={
                fieldName !== "Create User" ? this.handleTodo : this.handleUser
              }
              onCancel={this.handleCancel}
            >
              {fieldName === "Create User" ? (
                <UserForm userRecords={this.state} />
              ) : (
                <TodoForm />
              )}
            </Modal>
          </div>
        )}
      </StyledMainContainer>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(TabContent);
