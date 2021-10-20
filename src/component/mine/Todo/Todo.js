import { memo, useState, useCallback, useEffect } from "react";
import "./Todo.css";
import TodoInput from "./TodoInput/TodoInput";
import axios from "axios";
import { url } from "../../../constants";
import { DraggableTodoList } from "../DraggableTodoList";
const todoInitialValue = {
    priority: "low",
    _completed: false,
    id: 1,
    task: "",
    dateLine: "",
    is_completed: false,
}

const Todo = (props) => {
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState(0)
  const [todo, setTodo] = useState(todoInitialValue); 
  const handleChangeTodo = (e) => {
    setTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const updateTodo = useCallback((todo) => {
    const update = prev => prev.map((item) => {
      if( item._id === todo._id) {
        return todo
      }  
      return item
    }
    )
    setFiltered(update)
    axios.patch(`${url}todo/${todo._id}`, todo)
  }, []);
  const clearTodo = useCallback(() => {
    setTodo(todoInitialValue);
  }, []);


  const RemoveTodo = useCallback((e) => {
    e.stopPropagation();
    const id = e.currentTarget.closest("div").dataset.id;
    const remove = (prev) =>
      prev.filter((todo) => todo._id !== id && todo.id !== id);
      axios.delete(`${url}todo/${id}`).then(() => {
        setFiltered(remove);
      })
  }, []);

const createToDo = () => {
  axios.post(`${url}newToDo`, todo)
      .then(res => {
        setFiltered([...filtered, res.data])
      })
      .catch(error=>{
                console.log(error)
              })
  }

  const addTodo = useCallback(() => {
    const lastDragIndex =
      filtered.length > 0 ? Math.max(...filtered.map((t) => t.drag_index)) + 1 : 1;
      setTodo({
        ...todo,
        id: String(new Date().getTime()),
        drag_index: lastDragIndex,
      })
  
    
    setFiltered([...filtered, todo]);
    createToDo()
    clearTodo();
    
  }, [todo, clearTodo]);

  const getAllTodos = useCallback(() => {
    axios
      .get(`${url}toDo`)
      .then((r) => setFiltered(r.data))
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

 

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"))
    
    if (items) {
      setFiltered(items)
    } else {
      getAllTodos();
    }
  }, []);

  // const LogOut = () =>{
  //   localStorage.removeItem('log')
  //   props.history.push("/login")
  //   props.setUser(null);
  // }
  return (
    <>
      <TodoInput
        filter={filter}
        handleFilterChange={setFilter}
        value={todo.task}
        dateLine={todo.dateLine}
        addTodo={addTodo}
        handleChangeTodo={handleChangeTodo}
        priority={todo.priority}
      />
      {/* <div>
        <button type="button" className="btn btn-secondary logout" onClick={LogOut}>
          LogOut
          </button>
      </div> */}
      <DraggableTodoList
        filter={filter}
        items={filtered}
        RemoveTodo={RemoveTodo}
        updateTodo={updateTodo}
        handleDragEnd={setFiltered}
      />
    
    </>
  );
};

export default 

memo(Todo);
