import { useEffect, useState } from 'react';
import { MdAutoDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import '../styles/form.css'

function First(){
 const [isComplete, setisComplete] = useState(false);
 const [allTodos, setTodos] = useState([]);
 const [newTitle, setNewTitle] = useState("");
 const [newDesc, setNewDesc] = useState("");
 const [completedTodoArr, setCompletedTodoArr] = useState([]);
const handleAddTodo = ()=>{
    let newTodoItem = {
        title:newTitle,
        description: newDesc
    }

    let updatedTodo = [...allTodos];
    updatedTodo.push(newTodoItem);
    setTodos(updatedTodo);
    localStorage.setItem('todolist',JSON.stringify(updatedTodo));
    setNewTitle("");
    setNewDesc("");
};

useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
        setTodos(savedTodo);
    }
    if(savedCompletedTodo){
        setCompletedTodoArr(savedCompletedTodo);
    }
},[]);

const deleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
}

const deleteCompletedTodo = (index)=>{
    let reducedCompletedTodo = [...completedTodoArr];
    reducedCompletedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedCompletedTodo));
    setCompletedTodoArr(reducedCompletedTodo);
}

const completedTod = (index)=>{
    let nots = new Date();
    let dd = nots.getDate();
    let mm = nots.getMonth()+1;
    let years = nots.getFullYear();
    let hh = nots.getHours();
    let m = nots.getMinutes();
    let s = nots.getSeconds();
    let comple = dd+ '-' +mm+ '-' +years+ ' at ' + hh+ ':' +m+ ':' +s; 

    let filteredItem = {
        ...allTodos[index],
        completeddeOn: comple
    }
    
    let completedUpdatedArr = [...completedTodoArr];
    completedUpdatedArr.push(filteredItem);
    setCompletedTodoArr(completedUpdatedArr);
    localStorage.setItem('completedTodos',JSON.stringify(completedUpdatedArr));
    deleteTodo(index);
}
    return(
        <div className="main-box">
          <h1 className="title"><a href="/">To Do List</a></h1>
          <div className="second-box">
            <div className={`input-boxes ${isComplete === true && 'visible'}`}>
            <div className="sub-main">
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Add a task" className="input" />
            <input type="text" value={newDesc} onChange={(e)=>setNewDesc(e.target.value)} placeholder="Add description" className="input" />
            </div>
            <button type="button" onClick={handleAddTodo} className="news-btn">Add</button>
            </div>
            <div className="sub-one">
            <button type="button" className={`new-btn ${isComplete === false && 'active'}`} onClick={()=>setisComplete(false)}>To Do</button>
            <button type="button" className={`new-btn ${isComplete === true && 'active'}`} onClick={()=>setisComplete(true)}>Completed</button>
            </div>
            <div className="sub-two">
            {isComplete === false && allTodos.map((item,index)=>{
                // eslint-disable-next-line
                if(item.title !== "" && item.description !==""){
                    return(
                        <div className='todo-item' key={index}>
                        <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        </div>
                        <div className='btn-icon'>
                        <MdAutoDelete className='dlt-icon' onClick={()=>deleteTodo(index)} title='Delete todo' />
                        <FaCheck className='chk-icon' onClick={()=>completedTod(index)} title='Mark as complete' />
                        </div>
                        </div>
                    )
                }
            })}

            {isComplete === true && completedTodoArr.map((item,index)=>{
                // eslint-disable-next-line
                if(item.title !== "" && item.description !==""){
                    return(
                        <div className='todo-item' key={index}>
                        <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>Completed on : {item.completeddeOn}</p>
                        </div>
                        <div className='btn-icon'>
                        <MdAutoDelete className='dlt-icon' onClick={()=>deleteCompletedTodo(index)} title='Delete todo' />
                        </div>
                        </div>
                    )
                }
            })}
            </div>
          </div>
        </div>
    )
}

export default First;