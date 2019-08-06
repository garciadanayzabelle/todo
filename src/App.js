import React, {useState} from 'react';
import './App.css';
import uuid from 'uuid/v4';

import Tasks from './components/Tasks';
import AddTaskForm from './components/AddTaskForm';
import OngoingTasks from './components/OngoingTasks';
import CompletedTasks from './components/CompletedTasks';

import {BrowserRouter, Route, Link} from 'react-router-dom';

function App() {
  let [todoItems, setTodoItems] = useState(
  [
    // {id: uuid(), task: "Task 1"},
    // {id: uuid(), task: "Task 2"},
    // {id: uuid(), task: "Task 3"},
  ]);

  let [ongoingTasks, setOngoingTasks] = useState([]);

  let [completedTasks, setCompletedTasks] = useState([]);

  let [editorState, setEditorState] = useState(false);

  let [targetInput, setTargetInput] = useState("");

  function addNewTask(newTodo) {
      setTodoItems([...todoItems, newTodo]);
  }

  function taskItems() {
    return todoItems.map(function(items){
        return <Tasks
          key= {items.id}
          id= {items.id}
          task= {items.task}
          del= {del}
          done= {done}
          movetoOngoing= {movetoOngoing}
        />
    });
  }

  function completedTaskItems() {
    return completedTasks.map(function(items){
        return <CompletedTasks
          key= {items.id}
          id= {items.id}
          task= {items.task}
          movetoPending= {movetoPending}
        />
    });
  }

  function ongoingTaskItems() {
    return ongoingTasks.map(function(items){
        return <OngoingTasks
          key= {items.id}
          id= {items.id}
          task= {items.task}
          done= {done}
          movetoPending= {movetoPending}
          del= {del}
          
        />
    });
  }


  function del(items) {
    let updatedPending = todoItems.filter(function(item) {
      if(items.id !== item.id){
        return item;
      }
    });
    setTodoItems(updatedPending);

    let updatedOngoing = ongoingTasks.filter(function(item) {
      if(items.id !== item.id){
        return item;
      }
    });
    setOngoingTasks(updatedOngoing);
  }

  function done(items) {
    setCompletedTasks([...completedTasks, items])

    let updatedPending = todoItems.filter(function(item) {
      if(items.id !== item.id){
        return item;
      }
    });
    setTodoItems(updatedPending);

    let updatedOngoing = ongoingTasks.filter(function(item) {
      if(items.id !== item.id){
        return item;
      }
    });
    setOngoingTasks(updatedOngoing);
  }

  function movetoOngoing(items) {
    setOngoingTasks([...ongoingTasks, items])

    let updatedPending = todoItems.filter(function(item) {
      if(items.id !== item.id){
        return item;
      }
    });
    setTodoItems(updatedPending);
  }

  function movetoPending(items) {
    setTodoItems([...todoItems, items])

    let updatedOngoing = ongoingTasks.filter(function(item) {
      if(items.id !== item.id){
        return item;
      }
    });
    setOngoingTasks(updatedOngoing); 

    let updatedCompleted = completedTasks.filter(function(item) {
      if(items.id !== item.id){
        return item;
      }
    });
    setCompletedTasks(updatedCompleted); 
  }

  function clearCompleted() {
    setCompletedTasks([]);
  }

  function showPendingItems() {
    if(todoItems.length >0 ) {
      return(
        <div>
          <h4>Pending Tasks</h4>
            {taskItems()}
          </div>
      )
    } else {
      return(
        <div className="jumbotron text-center jumbo mt-4">
            <h4 className="jumbotext">Pending tasks empty</h4>
            <p></p>
         </div>
      )
    }
  }

  function showOngoingItems() {
    if(ongoingTasks.length > 0) {
      return(
        <div>
            <h4>Ongoing Tasks</h4>
            {ongoingTaskItems()}
        </div>
      );
    } else {
      return(
        <div className="jumbotron text-center jumbo mt-4">
            <h4 className="jumbotext">No ongoing tasks</h4>
            <p></p>
        </div>
      )
    }
  }

  function showCompletedTasks() {
    if(completedTasks.length > 0) {
      return(
        <div>
          <h4>Completed Tasks</h4>
            {completedTaskItems()}
            <button className="btn btn-block btn-dark mt-4 clearcompleted"
                onClick={clearCompleted}>
              Clear completed tasks
            </button>
        </div>
      );
    } else {
      return(
        <div className="jumbotron text-center jumbo mt-4">
            <h4 className="jumbotext">No completed tasks</h4>
            <p></p>
        </div>
      )
    }
  }


  return (
  	<BrowserRouter>

  		

	    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
	    	<ul className="navbarul">
	  			<li className="navbarli btn">
	  				<a><Link to="/pending">Pending Tasks</Link></a>
	  			</li>
	  			<li className="navbarli btn">
	  				<Link to="/ongoing">OngoingTasks</Link>
	  			</li>
	  			<li className="navbarli btn">
	  				<Link to="/completed">CompletedTasks</Link>
	  			</li>
  			</ul>
	      {/*<h1 className= "text-center">To Do List</h1>*/}
	      <div className="mt-5">
	        <AddTaskForm
	          addNewTask= {addNewTask}
	        />
	        {/*<div className="jumbotron text-center jumbo">
	            <h4 className="jumbotext">New tasks will be added to pending</h4>
        	</div>*/}
	      	<Route path="/pending" exact render={showPendingItems}/>
			<Route path="/ongoing" exact render={showOngoingItems}/>
			<Route path="/completed" exact render={showCompletedTasks}/>
	      </div>
	      {/*<div className="mt-3">
	      	{showPendingItems()}
	      </div>
	      <div className="mt-3">
	        {showOngoingItems()}
	      </div>
	      <div className="mt-3">
	        {showCompletedTasks()}  
	      </div>*/}
	    </div>

    </BrowserRouter>
  );
}

export default App;
