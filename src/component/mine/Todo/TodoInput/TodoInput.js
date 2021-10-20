import React, { useCallback } from "react";
import "./Todoinput.css";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
const TodoInput = ({
  value,
  deadline,
  addTodo,
  handleChangeTodo,
  priority,
  handleFilterChange,
  filter,
  LogOut
}) => {
  const getClassName = useCallback(
    (val) => {
      return val === filter ? "active" : "";
    },
    [filter]
  );
  return (
    <div className="TodoTutorial">
      <div className="h1">
        <h1>Todo tutorial</h1>
      </div>

      <div className="form">
        <div className = "formInp">
          <input
            className="deadline"
            value={value}
            onChange={handleChangeTodo}
            type="text"
            name="task"
            placeholder="write tasks"
          />
          <input
            className="deadline"
            value={deadline}
            onChange={handleChangeTodo}
            type="date"
            name="dateLine"
            placeholder="write data"
          />
            <div className="select">
        <Select
          className="select"
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={priority}
          name="priority"
          onChange={handleChangeTodo}
         
        >
         
          
          {/* <MenuItem
            placeholder="importance"
            selected
            disabled
            value="importance"
          >
            importance
          </MenuItem> */}
          <MenuItem className="green" value={"Low"}>
            Low
          </MenuItem>
          <MenuItem className="orange" value={"Middle"}>
            Medium
          </MenuItem>
          <MenuItem className="red" value={"High"}>
            High
          </MenuItem>
        </Select>
        </div>
        </div>
     
        <div className="buttons">
          <button
            onClick={addTodo}
            type="button"
            className="btn  btn-secondary"
            data-toggle="button"
            aria-pressed="false"
            autoComplete="off"
          >
            ADD TODO
          </button>
          <div className="col-md-3 group" >
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className={`btn btn-secondary ${getClassName(0)}`}
              onClick={() => handleFilterChange(0)}
            >
              ALL
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${getClassName(1)}`}
              onClick={() => handleFilterChange(1)}
            >
              Completed
            </button>
            <button
              type="button"
              className={`btn  btn-secondary ${getClassName(2)}`}
              onClick={() => handleFilterChange(2)}
            >
              Unfinished
            </button>
           
            
          </div>
        </div>
        </div>
       
      </div>
    </div>
  );
};
export default React.memo(TodoInput);
