import React, { Component } from "react";
import styled from "styled-components";
import { Button, Table } from "antd";
import { connect } from "react-redux";

const StyledButton = styled(Button)`
  margin-left: 20px;
`;

class Users extends Component {
  columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      render: text => <h4>{text}</h4>
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: text => <h4>{text}</h4>
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <span>
            <a style={{ marginRight: 16 }} onClick={()=>this.props.handleEdit(record)}>Edit </a>
            <a>Delete</a>
          </span>
        );
      }
    }
  ];

  render() {
    return (
      <div>
        <StyledButton onClick={e => this.props.showModal(e, "Create User")}>
          Create Users
        </StyledButton>
        <Table
          columns={this.columns}
          dataSource={this.props.userReducer.userData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Users);
