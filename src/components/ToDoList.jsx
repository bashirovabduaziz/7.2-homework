import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
} from "../ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import empty from "../assests/empty.jpg";

const ToDoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const [showModal, setShowModal] = useState(false);
  const [currentToDo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");
  console.log(newTask);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localToDoList = JSON.parse(localStorage.getItem("todoList"));
    if (localToDoList) {
      dispatch(setTodoList(localToDoList));
    }
  }, []);

  const handleAddTodo = (task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(
        addTodo({
          task: task,
          id: Date.now(),
        })
      );
      setNewTask("");
      setShowModal(true);
    }
  };
   
   const handleUpdateToDOList = (id,task) =>{
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(
        updateTodo({
          task: task,
          id:id
        })
      );
      setShowModal(false);
    }
   }

   const handleDaleteToDO = (id) => {
    const updateTodoList = todoList.filter(todo => todo.id != id)
    dispatch(setTodoList(updateTodoList))
     localStorage.setItem("todoList" , JSON.stringify(updateTodoList))
   }  
   
  function handleSort(sortCriteria) {
    dispatch(sortTodo(sortCriteria))
  }

  const sortToDoList = todoList.filter(todo => {
    if(sortCriteria === 'All') return true;
    if(sortCriteria === 'Completed' && todo.completed) return true;
    if(sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  })

  const handleToggleComleted = (id) => {
    dispatch(toggleCompleted({id}))
  }
  return (
    <div>
      {showModal && (
        <div className="fixed w-full left-0 top-0 h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <input
              type="text"
              placeholder={
                currentToDo ? "Update your task here" : "Enter your task here"
              }
              className="border p-2 rounded-md outline-none mb-6"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div className="flex gap-2">
              {currentToDo ? (
                <>
                  <button className="bg-orange-600 rounded-md text-white py-3 px-10" onClick={() => {
                    setShowModal(false);
                    handleUpdateToDOList(currentToDo.id,newTask)
                  }}>Save</button>
                  <button   className="bg-teal-700 rounded-md text-white py-3 px-10"
                    onClick={() => setShowModal(false)}>Cancle</button>
                </>
              ) : (
                <>
                  <button
                    className="bg-teal-700 rounded-md text-white py-3 px-10"
                    onClick={() => setShowModal(false)}
                  >
                    Cancle
                  </button>
                  <button
                    className="bg-orange-600 rounded-md text-white py-3 px-10"
                    onClick={() => {
                      setShowModal(true);
                      handleAddTodo(newTask);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="text-center">
        {todoList.length === 0 ? 
        <div>
        <div className="mb-8">
        <div className="sm:w-[500px] sm:h-[500px] min-w-[250px] ">
          <img src={empty}  className=""/>
        </div>
          <p className="text-center text-gray-400">You have no todo's, please add one</p>
        </div>
          </div> : 
          <div className="container mx-auto mt-6">
            <div>
              <select onChange={e => handleSort(e.target.value)}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Not Completed">Not Completed</option>
              </select>
            </div>
            <div>
              {sortToDoList.map(todo => (
                <div key={todo.id} className="flex items-center justify-between mb-6 bg-teal-700 mx-auto w-full md:w-[75%] rounded-md p-4 mt-10">
                  <div className={`${todo.completed ? "line-through text-teal-500" :"text-red-500"} cursor-pointer`}
                  onClick={() => {
                    handleToggleComleted(todo.id)
                  }}>{todo.task}</div>
                  <div>
                    <button className="bg-blue-500 text-white p-1 rounded-md ml-2" onClick={() => {
                      setShowModal(true);
                      setCurrentTodo(todo);
                      setNewTask(todo.task)
                    }}><TiPencil/></button>
                    <button className="bg-red-500 text-white p-1 rounded-md ml-2" onClick={() => handleDaleteToDO(todo.id)}><BsTrash/> </button>
                  </div>
                </div>
              ))}
          </div>
          </div>
          }
          <button
        className="bg-orange-600 text-center text-white py-2 px-10 rounded-md"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>
      </div>
    </div>
  );
};

export default ToDoList;
