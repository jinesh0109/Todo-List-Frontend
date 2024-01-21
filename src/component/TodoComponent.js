import React, { Component } from "react";
import TodoListComponent from "./TodoListComponent";
import { connect } from "react-redux";
import { addTODO } from "../utils/TodoSlice";
import { v4 as uuidv4 } from "uuid";

class TodoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoVal: "",
      filterType: "allTasks",
    };

    this.dispatch = this.props.dispatch;
  }

  addTodoItem = () => {
    const { todoVal } = this.state;
    if (todoVal) {
      this.dispatch(
        addTODO({
          id: uuidv4(),
          desc: todoVal,
          isCompleted: false,
        })
      );
      this.setState({ todoVal: "" });
    }
  };

  setFilterType = (filter) => {
    this.setState({ filterType: filter });
  };

  render() {
    const { todoVal, filterType } = this.state;

    return (
      <>
        <div className="flex flex-col font-sans py-10 gap-4">
          <div className="flex flex-col gap-4 text-gray-900 items-center">
            <h1 className="text-3xl font-medium">TodoMatic</h1>
            <h2 className="text-xl font-medium">What needs to be done?</h2>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <input
              type="text"
              value={todoVal}
              onChange={(e) => this.setState({ todoVal: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Add Your Daily Task Here...."
            />
            <button
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded px-4 py-2"
              onClick={this.addTodoItem}
            >
              Add
            </button>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <button
              className={`cursor-pointer ${
                filterType === "allTasks"
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-50 hover:bg-gray-200"
              } border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded px-4 py-2`}
              onClick={() => this.setFilterType("allTasks")}
            >
              Show All Tasks
            </button>
            <button
              className={`cursor-pointer ${
                filterType === "activeTasks"
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-50 hover:bg-gray-200"
              } border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded px-4 py-2`}
              onClick={() => this.setFilterType("activeTasks")}
            >
              Show Active Tasks
            </button>
            <button
              className={`cursor-pointer ${
                filterType === "completedTasks"
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-50 hover:bg-gray-200"
              } border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded px-4 py-2`}
              onClick={() => this.setFilterType("completedTasks")}
            >
              Show Completed Tasks
            </button>
          </div>
          <TodoListComponent filterType={filterType} />
        </div>
      </>
    );
  }
}

export default connect()(TodoComponent);
