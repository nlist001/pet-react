import {  TaskColumnsEnum,  type ITask } from "@/models/todo.model";
import { Checkbox } from "primereact/checkbox";
import { use } from "react";
import { Button } from "primereact/button";
import { DateTimeFormat } from "@/api/DateTimeFormat";
import { CartContext } from "../Cart/CartCtx";
import useEditTask from "./hooks/useEditTask";
import useDeleteTask from "./hooks/useDeleteTask";
import useStateSWR from "./hooks/useStateSWR";

export default function TodoList({tasks}) {
    const { addToCart, removeFromCart} = use(CartContext);
    const {set: setEditedTask} = useStateSWR<undefined | ITask>('editedTask');
    
    

return (<>
    <table className="w-full">
            <tbody>
                {tasks && tasks?.map((item) =><tr key={item.id}>
                    <td>
                       <Checkbox inputId={item.id} onChange={()=>{ item.done = !item.done; useEditTask(item)}} checked={item.done} />
                    </td>
                    { TaskColumnsEnum.arraylike().map(([,key])=>(
                    
                      <td key={key}  className="p-2 " >
                        
                        { 
                           (TaskColumnsEnum[key] == TaskColumnsEnum.start || TaskColumnsEnum[key] == TaskColumnsEnum.end) ? DateTimeFormat(item[key]) : item[key]
                        }
                    </td>
                    )) }
                    <td className=" p-2 flex">
                        <Button icon='pi pi-file-edit' text onClick={(e)=>{ e.preventDefault(); setEditedTask(item)}} />
                        <Button icon='pi pi-times' text onClick={(e)=>{ e.preventDefault();useDeleteTask(item.id) }} />
                        <Button icon='pi pi-cart-plus' text onClick={(e)=>{ e.preventDefault();addToCart(item) }} />
                        <Button icon='pi pi-cart-minus' text onClick={(e)=>{ e.preventDefault();removeFromCart(item) }} />

                    </td>
                </tr>)} 
            </tbody>
        </table>
       

    </>);
}
