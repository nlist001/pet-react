import useSWR from 'swr';
import { httpCallJson } from "@/api/commonApi";
import { QueryTypeEnum } from "@/models/api.model";
import { useHeaderMessages } from '@/hooks/useHeaderMessages';


export default (id: string) =>  {
    const { addMessage } = useHeaderMessages();
    return useSWR(
        QueryTypeEnum.todo, 
        async () => await httpCallJson<void>("tasks/" + id, "DELETE"),
        {
            onError(e, id, context) {
                addMessage({ severity: "error", detail: "Error of removing " + id });
            }
        }
    )
}

