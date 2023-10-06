import { combineReducers } from "redux";

const initialTodoState = {
  tasks: [],
};

const todoReducer = (state = initialTodoState, action) => {
  let nextSerialNumber = state.tasks.length + 1;
  switch (action.type) {
    case "ADD_TASK":
      const newTask = {
        id: nextSerialNumber,
        ...action.payload,
      };
      nextSerialNumber++;
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    case "EDIT_TASK":
      const { id } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...action.payload } : task
        ),
      };

    case "DELETE_TASK":
      const taskIdToDelete = action.payload;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== taskIdToDelete),
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  task: todoReducer,
});

export default rootReducer;
