import { Task, type ITask } from "@/models/todo.model";
import { EditAddTaskDialog } from "./EditAddTaskDialog"
import useStateSWR from "./hooks/useStateSWR"


export default function EditAddTaskDialogWrapper() {
    const {set: setEditedTask, get} = useStateSWR<undefined | ITask>('editedTask');
    const editedTask = get()
   
  return ( 
      <div>
          <EditAddTaskDialog editedTask={editedTask} setEditedTask={setEditedTask} /> 
          <button className="pi pi-plus " onClick={() => setEditedTask(new Task())}> Add task </button>
    </div>)
}