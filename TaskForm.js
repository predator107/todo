import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext"; 

const TaskForm = () => {
   
    const {dispatch}=useTasksContext();
    const {user}=useAuthContext();
    
    const [title,setTitle]= useState('');
    const [error,setError]= useState(null);
    const [emptyFields,setEmptyFields] = useState([]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!user){
            setError('You must be logged in')
            return 
        }
        const task={title};

        const response = await fetch('/api/tasks',{
            method:'POST',
            body: JSON.stringify(task),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json();

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            setTitle('');
            setError(null);
            setEmptyFields([]);

            console.log('new task added',json);
            dispatch({type:'CREATE_TASK',payload:json});
        }
    }
    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Task</h3>
            <label>Task title:</label>
            <input 
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title')?'error':''}
            />
            <button type="submit">Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default TaskForm;