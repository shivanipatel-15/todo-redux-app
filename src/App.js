import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AddEditTask from "./components/addEditTask";
import { deleteTask } from "./redux/action";
import TableView from "./components/tableView";

function App() {
  const taskList = useSelector((state) => state.task.tasks);
  const [defaultData, setDefaultData] = useState(null);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const dispatch = useDispatch();

  const openTask = () => {
    setOpenTaskDialog(true);
  };

  const closeTask = () => {
    setOpenTaskDialog(false);
    setDefaultData(null);
  };

  const onClickEdit = (tasks) => {
    setDefaultData(tasks, () => {
      setOpenTaskDialog(true);
    });
  };

  const onClickDelete = (tasks) => {
    dispatch(deleteTask(tasks.id));
  };

  return (
    <div className="App">
      <header>
        <h1>To-do</h1>
        <div className=".view-todo">
          <div className="headerBtnWrapper">
            <button
              onClick={() => {
                openTask();
              }}
            >
              Add Task
            </button>
          </div>
        </div>
      </header>
      <div className="todo-list">
        {taskList.length === 0 ? (
          <p className="error-msg">No tasks found</p>
        ) : (
          <table className="table-view-todo">
            <thead>
              <tr>
                <th>Task id</th>
                <th>User name</th>
                <th>Gender</th>
                <th>Hobby</th>
                <th>Age</th>
                <th>Date</th>
                <th>Task Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-view-product">
              {taskList.map((task) => (
                <TableView
                  key={task.id}
                  task={task}
                  // setProductDetails={setProductDetails}
                  onClickEdit={onClickEdit}
                  onClickDelete={onClickDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      {defaultData && (
        <AddEditTask
          defaultData={defaultData}
          isOpen={true}
          onClose={closeTask}
        />
      )}
      {openTaskDialog && (
        <AddEditTask
          defaultData={defaultData}
          isOpen={openTaskDialog}
          onClose={closeTask}
        />
      )}
    </div>
  );
}

export default App;
