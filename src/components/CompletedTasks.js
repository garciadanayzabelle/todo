import React from 'react';

function CompletedTasks(props) {

	function pendingBtnClicked() {
    	props.movetoPending({id: props.id, task: props.task});
    }

	return(
		<div>
			<ul className="list-group">
	    		<li className="list-group-item m-1 completedtask">
					<span className="strikethrough"
							onClick={pendingBtnClicked}
							data-toggle="tooltip"
	                        data-placement="top" 
	                        title="Undo completed task"
					>{props.task}</span>	
				</li>
	    	</ul>
		</div>
 	);
}

export default CompletedTasks;