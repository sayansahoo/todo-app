import React, { Component } from "react";
import { Tabs, Modal } from "antd";
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
    confirmLoading: false
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
    const { todoData, Todo, date } = this.props.todoReducer;
    const { edit } = this.state;
    if (!edit) {
      if (!Todo || !date) {
        return;
      }
      this.setState({ confirmLoading: true });
      let data = {
        Todo: Todo,
        date: date,
        key: todoData.length,
      };
      this.props.dispatch(todoActions.setData([...todoData, data]));
      setTimeout(() => {
        this.setState(
          {
            visible: false,
            edit: false,
            confirmLoading: false,
          },
          () => {
            this.props.dispatch(todoActions.setDate(""));
            this.props.dispatch(todoActions.setAction(""));
          }
        );
      }, 500);
    } else {
      const { todoKey } = this.state;
      const found = todoData.findIndex((a) => todoKey === a.key);
      if (found > -1) {
        let payload = todoData;
        payload[found] = {
          Todo: Todo,
          date: date,
          key: todoKey,
        };
        this.props.dispatch(todoActions.setData(payload));
      }
      setTimeout(() => {
        this.setState(
          {
            edit: false,
            visible: false,
            confirmLoading: false
          },
          () => {
            this.props.dispatch(todoActions.setDate(""));
            this.props.dispatch(todoActions.setAction(""));
          }
        );
      }, 500);
    }
  };

  handleUser = (e) => {
    const { name, email, userData } = this.props.userReducer;
    const { edit } = this.state;
    if (!edit) {
      if (!name || !email) {
        return;
      }
      this.setState({ confirmLoading: true });
      let data = {
        name: name,
        email: email,
        key: userData.length,
      };
      this.props.dispatch(userActions.setData([...userData, data]));
      setTimeout(() => {
        this.setState(
          {
            visible: false,
            edit: false,
            confirmLoading: false
          },
          () => {
            this.props.dispatch(userActions.setName(""));
            this.props.dispatch(userActions.setEmail(""));
          }
        );
      }, 500);
    } else {
      const { userKey } = this.state;
      const found = userData.findIndex((a) => userKey === a.key);
      if (found > -1) {
        let payload = userData;
        payload[found] = {
          name: name,
          email: email,
          key: userKey,
        };
        this.props.dispatch(userActions.setData(payload));
      }
      setTimeout(() => {
        this.setState(
          {
            edit: false,
            visible: false,
            confirmLoading: false
          },
          () => {
            this.props.dispatch(userActions.setName(""));
            this.props.dispatch(userActions.setEmail(""));
          }
        );
      }, 500);
    }
  };

  handleCancel = (e) => {
    this.props.dispatch(todoActions.setDate(""));
    this.props.dispatch(todoActions.setAction(""));
    this.props.dispatch(userActions.setName(""));
    this.props.dispatch(userActions.setEmail(""));
    this.setState({
      visible: false,
    });
  };

  callback = (key) => {
    this.setState({ tab: key });
  };

  handleEdit = (record, s) => {
    this.props.dispatch(userActions.setName(record.name));
    this.props.dispatch(userActions.setEmail(record.email));
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
    this.props.dispatch(todoActions.setAction(record.Todo));
    this.props.dispatch(todoActions.setDate(record.date));
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
