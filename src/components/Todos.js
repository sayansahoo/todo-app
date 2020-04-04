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
      render: (text) => <p style={{fontSize: '15px'}}>{text}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <p style={{fontSize: '15px'}}>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <span>
            <a
              style={{ marginRight: 16 }}
              onClick={() => this.props.handleEditTodo(record, "Create Todo")}
            >
              Edit{" "}
            </a>
            <a onClick={() => this.props.handleDeleteTodo(record)}>Delete</a>
          </span>
        );
      },
    },
  ];

  render() {
    return (
      <div>
        <StyledButton onClick={(e) => this.props.showModal(e, "Create Todo")}>
          Create Todos
        </StyledButton>
        <Table
          columns={this.columns}
          dataSource={[...this.props.todoReducer.todoData]}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Todos);
