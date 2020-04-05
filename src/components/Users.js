import React, { Component } from "react";
import styled from "styled-components";
import { Button, Table } from "antd";
import { connect } from "react-redux";

const StyledButton = styled(Button)`
  margin-left: 20px;
`;

class Users extends Component {
  state = {
    data: [],
  };
  columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p style={{fontSize: '13px'}}>{text}</p>,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (text) => <p style={{fontSize: '13px'}}>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <span>
            <a
              style={{ marginRight: 16 }}
              onClick={() => this.props.handleEdit(record, "Create User")}
            >
              Edit{" "}
            </a>
            <a onClick={() => this.props.handleDelete(record)}>Delete</a>
          </span>
        );
      },
    },
  ];

  componentDidMount() {
    this.setState({ data: this.props.userReducer.userData });
  }
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.userReducer.userData) !==
      JSON.stringify(this.props.userReducer.userData)
    ) {
      this.setState({ data: this.props.userReducer.userData });
    }
  }
  render() {
    return (
      <div>
        <StyledButton onClick={(e) => this.props.showModal(e, "Create User")}>
          Create Users
        </StyledButton>
        <Table columns={this.columns} dataSource={[...this.state.data]} />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Users);
