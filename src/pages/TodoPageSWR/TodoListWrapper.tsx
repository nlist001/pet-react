import { useState  } from "react";
import useGetAllTasks from "./hooks/useGetAllTasks";


import TodoList from "./TodoList";
import { PaginatorComponent } from "./PaginatorComponent";
    
export default function TodoListWrapper() {
    const [page, setPage] = useState(1);
    const { data: tasks} = useGetAllTasks(page)
    
    return (<> <TodoList tasks={tasks?.data}></TodoList>
        { tasks && <PaginatorComponent tasks={tasks} setPage={setPage}  />} 
    </>)
}