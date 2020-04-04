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
    Todo: "",
    date: "",
    todoKey: "",
    edit: false,
    userData: [],
    tab: "",
    confirmLoading: false,
  };

  showModal = (e, s) => {
    this.setState({
      visible: true,
      fieldName: s,
      name: "",
      email: "",
      Todo: "",
      date: "",
    });
  };

  handleTodo = (e) => {
    this.setState({ confirmLoading: true });
    const { edit } = this.state;
    if (!edit) {
      let data = {
        Todo: this.props.todoReducer.Todo,
        date: this.props.todoReducer.date,
        key: this.props.todoReducer.todoData.length,
      };
      this.props.dispatch(
        todoActions.setData([...this.props.todoReducer.todoData, data])
      );
      setTimeout(() => {
        this.setState({
          visible: false,
          edit: false,
          confirmLoading: false,
        });
      }, 1000);
    } else {
      const { todoData } = this.props.todoReducer;
      const { todoKey } = this.state;
      const found = todoData.findIndex((a) => todoKey === a.key);
      if (found > -1) {
        let payload = todoData;
        payload[found] = {
          Todo: this.props.todoReducer.Todo,
          date: this.props.todoReducer.date,
          key: todoKey,
        };
        this.props.dispatch(todoActions.setData(payload));
      }
      setTimeout(() => {
        this.setState({ edit: false, visible: false, confirmLoading: false });
      }, 1000);
    }
  };

  handleUser = (e) => {
    this.setState({ confirmLoading: true });
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
      setTimeout(() => {
        this.setState({
          visible: false,
          edit: false,
          confirmLoading: false,
        });
      }, 1000);
    } else {
      const { userData } = this.props.userReducer;
      const { userKey } = this.state;
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
      setTimeout(() => {
        this.setState({ edit: false, visible: false, confirmLoading: false });
      }, 1000);
    }
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  callback = (key) => {
    this.setState({ tab: key });
  };

  handleEdit = (record, s) => {
    this.setState({
      name: record.name,
      email: record.email,
      userKey: record.key,
      visible: true,
      edit: true,
      fieldName: s,
    });
  };

  handleEditTodo = (record, s) => {
    this.setState({
      edit: true,
      Todo: record.Todo,
      date: record.date,
      todoKey: record.key,
      visible: true,
      fieldName: s,
    });
  };

  triggerTodoModal = (e, s) => {
    this.showModal(e);
    this.setState({ Todo: "", date: "", fieldName: s });
  };

  triggerUserModal = (e, s) => {
    this.showModal(e);
    this.setState({ name: "", email: "", fieldName: s });
  };

  handleDelete = (record) => {
    const { userData } = this.props.userReducer;
    const payload = userData.filter((a) => a.name !== record.name);
    this.props.dispatch(userActions.setData(payload));
  };

  handleDeleteTodo = (record) => {
    const { todoData } = this.props.todoReducer;
    const payload = todoData.filter((a) => a.Todo !== record.Todo);
    this.props.dispatch(todoActions.setData(payload));
  };

  render() {
    const { visible, fieldName, confirmLoading } = this.state;
    return (
      <StyledMainContainer>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Todos" key="1">
            <Todos
              showModal={this.showModal}
              handleEditTodo={this.handleEditTodo}
              handleDeleteTodo={this.handleDeleteTodo}
            />
          </TabPane>
          <TabPane tab="users" key="2">
            <Users
              showModal={this.showModal}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
            />
          </TabPane>
        </Tabs>
        {visible && (
          <div>
            <Modal
              confirmLoading={confirmLoading}
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
                <TodoForm todoRecords={this.state} />
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
