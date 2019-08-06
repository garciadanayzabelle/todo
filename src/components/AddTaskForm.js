import React, {useState} from 'react';
import uuid from 'uuid/v4';

function AddTaskForm(props) {

	let[newTask, setNewTask] = useState("");


	function addClickHandler() {
		let newTodo = {
			id: uuid(),
			task: newTask
		}

		if(newTask.trim() !== ""){
			props.addNewTask(newTodo);
			setNewTask("");
		} else {
			setNewTask("");
		}
		
	};

	function taskChangeHandler(event) {
		setNewTask(event.target.value);
	}

	function onEnterPress (e) {
  		if(e.keyCode === 13) {
    		{addClickHandler()};
  		}
	}

	return(
		<div className="row">
			<div className="input-group mb-3 m-2">
 			  <input autoFocus
 			  	id="newTask"
 			  	type="text" 
 			  	className="form-control taskinput" 
 			  	placeholder="Add new task.." 
 			  	aria-label="Username" 
 			  	aria-describedby="basic-addon1"
 			  	value={newTask}
 				onChange={taskChangeHandler}
 				onKeyDown={onEnterPress}
 				autoComplete="off"
 				data-toggle="tooltip"
                data-placement="top" 
                title="New tasks will be added to pending"
 			  />
 			   <div className="input-group-append">
    				<button 
    					className="btn addtaskBtn" 
    					type="submit"
    					onClick={addClickHandler}
    					onSubmit={addClickHandler}
    				>
    					Add
    				</button>
  			   </div>
			</div>
		</div>
	);
};

export default AddTaskForm;