import { httpCallJson } from "@/api/commonApi";
import { QueryTypeEnum } from "@/models/api.model";
import { type ITask } from '@/models/todo.model';
import useSWRMutation from 'swr/mutation';


export default (onSuccess?:Function) => useSWRMutation(
    QueryTypeEnum.task,
    async (url,  { arg }: { arg:  ITask}) => await httpCallJson<ITask[]>("tasks", "POST", arg),
    {
        onSuccess:()=>{
            onSuccess && onSuccess();
        }
    }
);