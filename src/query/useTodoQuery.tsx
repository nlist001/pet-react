import { httpCallJson, type IOption } from "@/api/commonApi";
import { QueryTypeEnum } from "@/models/api.model";
import { Task, type IResGetTodo, type ITask } from "@/models/todo.model";
import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useHeaderMessages } from "@/hooks/useHeaderMessages";
import { queryClient } from "@/api/queryClient";

export function useTodoQuery() {
  const page = useTodoQuery.page || 1;

  console.log("useTodoQuery: rerender ");

  const { addMessage } = useHeaderMessages();

  const getTodoOptions = queryOptions({
    queryKey: [QueryTypeEnum.todo, {page}],
    queryFn: (meta) =>
      httpCallJson<IResGetTodo>("tasks", { _page: page } as IOption).then(res => res ? {...res, data: res.data.map(el=>new Task(el))} : null),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  const getTodo = () => {

    return useQuery(getTodoOptions);
  };
  const getTask = (id:string) => {
    
    return useQuery({
      queryKey: [QueryTypeEnum.task, id],
      async queryFn() { return httpCallJson<IResGetTodo>("tasks/"+id).then(t => new Task(t)) },
      staleTime: Infinity,
    });
  };

  const getStat = () => {
    return useQuery({queryKey: [QueryTypeEnum.todo],
        queryFn: (meta) => httpCallJson<ITask[]>("tasks"),
        staleTime: Infinity,
        placeholderData: keepPreviousData
    });
  };

  const addTask = (doOnSuccess?: () => void) => {
    return useMutation({
      mutationFn: (data: ITask) => {
        const findEl = queryClient
          .getQueryData(getTodoOptions.queryKey)
          ?.data.find((el) => el.id == data.id);
        if (findEl) {
          return new Promise((resolve, reject) => {
            resolve(findEl);
          });
        }
        return httpCallJson<ITask[]>("tasks", "POST", data);
      },

      async onSuccess(data) {
        doOnSuccess && doOnSuccess();
        queryClient.invalidateQueries({
          queryKey: [QueryTypeEnum.todo],
        });
      },
    });
  };

  const editTask = (doOnSuccess?: () => void) => {
    return useMutation({
      mutationFn: (data: ITask) =>      httpCallJson<ITask[]>("tasks/" + data.id, "PUT", data),
      async onSuccess(data) {
        doOnSuccess && doOnSuccess();
        queryClient.invalidateQueries({
          queryKey: [QueryTypeEnum.todo],
        });
      },
    });
  };

  const deleteTask = () => {
    return useMutation({
      mutationFn: (id: string) => httpCallJson<void>("tasks/" + id, "DELETE"),

      async onError(e, id, context) {
        addMessage({ severity: "error", detail: "Error of removing " + id });
        if(context?.oldData) {
          queryClient.setQueryData([getTodoOptions.queryKey],context?.oldData);
        }
      },

      async onSuccess(_, deletedId) {
        /* queryClient.setQueryData(getTodoOptions.queryKey, (todo) => {
          return {
            ...todo,
            data: todo?.data?.filter((item) => item.id !== deletedId),
          };
        }); */
      },

      async onSettled() {

        /* queryClient.invalidateQueries({
          queryKey: [QueryTypeEnum.todo],
          refetchType: "none"
        }); */
      },
      onMutate: async(data)=> {
        await queryClient.cancelQueries({queryKey:[QueryTypeEnum.todo]});
        const oldData = queryClient.getQueryData([QueryTypeEnum.todo]);
        queryClient.invalidateQueries({
          queryKey: [QueryTypeEnum.todo],
          refetchType: "none"
        });
        return {oldData}
      }
      /*  async onSettled() {
        queryClient.invalidateQueries({
            queryKey: [todoListApi.baseKey]
        });
        },
        async onSuccess(_, deletedId) {
        queryClient.setQueryData(
            todoListApi.getTodoListQueryOptions({ userId: user.data.id }).queryKey,
            todos => todos?.filter(item => item.id !== deletedId)
        );
        } */
    });
  };

  return {
    getTodo,
    addTask,
    editTask,
    deleteTask,
    getStat,
    getTask
  };
}


export namespace useTodoQuery {
  export const page = 1;

}