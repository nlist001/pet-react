import useSWR from 'swr';
import { httpCallJson, type IOption } from "@/api/commonApi";
import { QueryTypeEnum } from "@/models/api.model";
import { Task, type IResGetTodo } from '@/models/todo.model';


export default (page) =>  useSWR(
    QueryTypeEnum.todo, 
    async () => await httpCallJson<IResGetTodo>("tasks", { _page: page } as IOption)
        .then(res => res ? {...res, data: res.data.map(el=>new Task(el))} : null)
)
