import React, {useState} from 'react';

function OngoingTasks(props) {

	let[editTask, setEditTask] = useState(props.task);

	let[editorState, setEditorState] = useState(false);

	function doneBtnClicked() {
        props.done({id: props.id, task: editTask});
    }

    function pendingBtnClicked() {
    	props.movetoPending({id: props.id, task: editTask});
    }

    function deleteBtnClicked() {
    	props.del({id: props.id, task: editTask});
    }

    function taskChangeHandler(event) {
        setEditTask(event.target.value);
        return editTask;
    }

    function onEnterPress (event) {
        if(event.keyCode === 13) {
            setEditTask(event.target.value);
            event.target.blur();
            return editTask;
        }
    }

    function enableEdit() {
        setEditorState(true);
    }

    function disableEdit() {
        setEditorState(false);
    }

    function displayEditInput() {
        if(editorState === true) {
            return(
                <input type="text"
                    autoFocus
                    value={editTask}
                    className="pendingTaskEdit"
                    onChange={taskChangeHandler}
                    onKeyDown={onEnterPress}
                    data-toggle="tooltip"
                    data-placement="top" 
                    title="Edit task"
                    autoComplete= "off"
                />     
            );
        }else {
            return(
                <span>{editTask}</span>
            );
        }
    }

	return(
		<div>
			<ul className="list-group">
	    		<li className="list-group-item m-1 ongoingtask pr-0">
	    			<button className="doneBtn m-1 rounded mr-3 mt-1"
                        onClick={doneBtnClicked}
                        data-toggle="tooltip"
                        data-placement="top" 
                        title="DONE"
               		 >
    					<i className="fas fa-check"></i>
					</button>
					<span className="disablededit">
						{displayEditInput()}
					</span>
					<button className="deleteBtn m-1 rounded float-right"
	                        data-toggle="tooltip"
	                        data-placement="top" 
	                        title="Delete task"
	                        onClick={deleteBtnClicked}
               		>
    				<i className="far fa-trash-alt"></i>
	    			</button>
					{<button className="editBtn m-1 rounded float-right"
	                        data-toggle="tooltip"
	                        data-placement="top" 
	                        title="Edit task"
	                        onClick={enableEdit}
	                >
	    				<i className="far fa-edit"></i>
	    			</button>}
	    			<button className="pendingBtn m-1 rounded float-right"
	                        data-toggle="tooltip"
	                        data-placement="top" 
	                        title="Move task back to pending"
	                        onClick={pendingBtnClicked}
	                >
	                    <i className="fas fa-arrow-up"></i>
                	</button>
	    			
				</li>
    		</ul>

		</div>
 	);
}

export default OngoingTasks;