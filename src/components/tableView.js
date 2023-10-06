import React, { useState } from "react";
import moment from "moment";
import { Dialog, DialogTitle } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TableView = ({ task, onClickEdit, onClickDelete }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
    return (
      <Dialog open={isOpen} onClose={onClose} className="dlt-dialog">
        <DialogTitle>Confirm Delete</DialogTitle>
        <div className="dialog-message">
          Are you sure you want to delete this task?
        </div>
        <div className="dialog-actions">
          <button onClick={onClose} color="primary">
            Cancel
          </button>
          <button onClick={onConfirm} color="primary">
            Delete
          </button>
        </div>
      </Dialog>
    );
  };

  const selectedHobbies = Object.keys(task.hobbies)
    .filter((key) => task.hobbies[key] === true)
    .join(", ");

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onClickDelete(task);
    setIsDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <tr className="todo" key={task.id}>
      <td>{task.id}</td>
      <td>{task.username}</td>
      <td>{task.gender}</td>
      <td>{selectedHobbies}</td>
      <td>{task.age.join("-")}</td>
      <td>{moment(task.date).format("DD/MM/YYYY")}</td>
      <td>{task.taskName}</td>
      <td>{task.status.value}</td>
      <td>
        <div className="todo-action">
          <button
            className="todo-action-btn"
            onClick={() => {
              onClickEdit(task);
            }}
          >
            <Edit />
          </button>
          <span> </span>
          <button className="todo-action-btn" onClick={handleDeleteClick}>
            <Delete />
          </button>
        </div>
      </td>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </tr>
  );
};

export default TableView;
