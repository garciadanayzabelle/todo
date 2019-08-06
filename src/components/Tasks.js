import React, {useState} from 'react';

function Tasks(props) {

    let[editTask, setEditTask] = useState(props.task);

    let[editorState, setEditorState] = useState(false);

    function deleteBtnClicked() {
        props.del({id: props.id, task: props.task});
    }

    function doneBtnClicked() {
        props.done({id: props.id, task: editTask});
    }

    function ongoingBtnClicked() {
        props.movetoOngoing({id: props.id, task: editTask});
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
                    onBlur={disableEdit}
                />     
            );
        }else {
            return(
                <span>{editTask}</span>
            );
        }

    }


  return (
    <div>
        {props.showPendingItems}
        <ul className="list-group">
            <li className="list-group-item m-1 pendingtask pr-0">
                <button className="doneBtn rounded mr-3 mt-1"
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
                        onClick= {enableEdit}
                >
                    <i className="far fa-edit"></i>
                </button>}
                <button className="ongoingBtn m-1 rounded float-right"
                        data-toggle="tooltip"
                        data-placement="top" 
                        title="Move task to ongoing"
                        onClick={ongoingBtnClicked}
                >
                    <i className="fas fa-arrow-right"></i>
                </button>
            </li>
        </ul>
    </div>

  );
}

export default Tasks;