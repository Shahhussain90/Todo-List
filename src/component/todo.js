import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editing, setEditing] = useState(null);
  
  const user = useSelector((state) => state.user.value); // Accessing the 'value' inside the user slice
  const history = useHistory();

  useEffect(() => {
    if (!user.isLoggedIn) {
      history.push('/register'); // Redirect to login if not logged in
    }
  }, [user, history]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const data = await response.json();
      setItems(data.map((todo) => ({ id: todo.id, name: todo.title })));
    };
    fetchData();
  }, []);

  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } else {
      const allInputData = { id: new Date().getTime(), name: inputData };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((element) => element.id !== id);
    setItems(updatedItems);
  };

  const editItem = (id) => {
    setEditing(id);
    setToggleSubmit(false);
    const itemToEdit = items.find((element) => element.id === id);
    setInputData(itemToEdit.name);
  };

  const saveEdit = (id, newName) => {
    const updatedItems = items.map((element) => {
      if (element.id === id) {
        return { ...element, name: newName };
      }
      return element;
    });
    setItems(updatedItems);
    setEditing(null);
    setToggleSubmit(true);
    setInputData("");
  };

  return (
    <div className="main_div">
      <h1>Todo List</h1>
      <div className="todo_list">
        <input
          type="text"
          className="todo_input"
          placeholder='Add To The List'
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        {
          toggleSubmit
            ? <button className='add_btn' onClick={addItem}>+</button>
            : <button className='edit_btnn' onClick={() => saveEdit(editing, inputData)}>Save!</button>
        }
      </div>

      <div className='list'>
        {
          items.map((element) => {
            return (
              <div className='Items' key={element.id}>
                {editing === element.id ? (
                  <input
                    className='list_inp'
                    type="text"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                  />
                ) : (
                  <h3>{element.name}</h3>
                )}
                <div className='edit_del'>
                  <button onClick={() => editItem(element.id)}><FontAwesomeIcon className='icons' icon={faPenToSquare} /></button>
                  <button onClick={() => deleteItem(element.id)}><FontAwesomeIcon className='icons' icon={faDeleteLeft} /></button>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Todo;
