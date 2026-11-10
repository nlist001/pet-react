import useSWRMutation from 'swr/mutation';
import { httpCallJson } from "@/api/commonApi";
import { QueryTypeEnum } from "@/models/api.model";
import { type ITask } from '@/models/todo.model';

export default (onSuccess?:Function) => useSWRMutation(
    QueryTypeEnum.task,
    async (url,  { arg }: { arg:  ITask}) => await httpCallJson<ITask[]>("tasks/" + arg.id, "PUT", arg),
    {
        onSuccess:()=>{
            onSuccess && onSuccess();
        }
    }
);