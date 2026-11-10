import useSWR from 'swr';
import { httpCallJson } from "@/api/commonApi";
import { QueryTypeEnum } from "@/models/api.model";
import { Task, type IResGetTodo } from '@/models/todo.model';

export default (id: string) => useSWR(
    QueryTypeEnum.task,
    async () => await httpCallJson<IResGetTodo>("tasks/"+id).then(t => new Task(t)) 
)
