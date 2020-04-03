import React, { Component } from "react";
import styled from "styled-components";
import { Button, Table } from "antd";
import { connect } from "react-redux";

const StyledButton = styled(Button)`
  margin-left: 20px;
`;

class Todos extends Component {

  columns = [
    {
      title: "Todo",
      dataIndex: "Todo",
      key: "Todo",
      render: text => <h4>{text}</h4>
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: text => <h4>{text}</h4>
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <span>
            <a style={{ marginRight: 16 }} >Edit </a>
            <a>Delete</a>
          </span>
        );
      }
    }
  ];


  render() {
    return (
      <div>
        <StyledButton onClick={e => this.props.showModal(e, "Create Todo")}>
          Create Todos
        </StyledButton>
        <Table
          columns={this.columns}
          dataSource={this.props.todoReducer.todoData}
        />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Todos);
