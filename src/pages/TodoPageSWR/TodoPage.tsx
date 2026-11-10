import { SWRConfig } from 'swr'
import { SWRDevTools } from 'swr-devtools' 

import EditAddTaskDialogWrapper from "./EditAddTaskDialogWrapper";
import TodoListWrapper from "./TodoListWrapper";



export default function TodoPage() {
 
  return ( 
      <div>
        <SWRConfig>
            <SWRDevTools>
                <h1>TodoPageSWR </h1>
                <EditAddTaskDialogWrapper /> 
                <TodoListWrapper />
            </SWRDevTools>
        </SWRConfig>
      </div>
      

  );
}
