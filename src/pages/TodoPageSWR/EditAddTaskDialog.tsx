import { Task, UnitEnum, type ITask } from "@/models/todo.model";
import { errorHandler } from "@/services/form.service";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { RadioButton } from "primereact/radiobutton";
import { Controller, useForm } from "react-hook-form";
import useEditTask from "./hooks/useEditTask";
import useAddTask from "./hooks/useAddTask";

export interface IEditAddTaskDialogProps {
  editedTask: undefined | ITask; 
  setEditedTask: (newData: ITask | undefined) => void;
 
}

const DEFAULT_TASK = new Task(); 

export const EditAddTaskDialog =  ({ editedTask, setEditedTask}: IEditAddTaskDialogProps) => {
  const isEdit = Boolean(editedTask?.name);

  const { handleSubmit, control, reset, formState } = useForm({
    values: editedTask || DEFAULT_TASK
  });

  const { trigger : triggerEditTask, isMutating: isMutatingEditTask} = useEditTask(onSuccess)
  const { trigger : triggerAddTask, isMutating: isMutatingAddTask} = useAddTask(onSuccess)
  
  function onSuccess() {
    reset();
    setEditedTask(undefined);
  };

  const onSubmit = (data:ITask) => {
      console.log('onSubmit data ', data)

      if (isEdit) {
        triggerEditTask(data)
      } else {
        triggerAddTask(data);
      }
  };

console.log('editedTask',editedTask, 'isEdit: ',isEdit, Boolean(editedTask?.id), (editedTask?.id))
  return (
    <>
     
      <Dialog
        header={isEdit ? "Edit Task":"Add Task"}
        visible={!!editedTask}
        style={{ width: "50vw" }}
        onHide={() => setEditedTask(undefined)}
      >
        {(isMutatingAddTask || isMutatingEditTask) && (
          <div className="absolute w-full h-full z-3 ">
            <ProgressSpinner />
          </div>
        )}
       
        <div className="m-0">
         
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (<>
             
                <InputText
                  {...field}
                  placeholder="Task name"
                  {...errorHandler(fieldState)}
                  className="w-full  p-inputtext-sm mb-4"
                />
              </>)}
            />

            <Controller
              name="count"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <InputNumber
                  showButtons
                  {...field}
                  {...errorHandler(fieldState)}
                  inputRef={field.ref} 
                  value={editedTask?.count}
                  onValueChange={(e) => field.onChange(Number(e.value))} 
                  placeholder="Count"
                  className="w-full p-inputtext-sm mb-4"
                />
              )}
            />

            <Controller
              name="unit"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <div className="flex flex-wrap gap-3">
                  {Object.keys(UnitEnum).map((unit) => (

                    
                    <div key={unit} className="flex align-items-center">
                      <RadioButton
                        inputId={unit}
                        {...field}
                        inputRef={field.ref} 
                        {...errorHandler(fieldState)}
                        onChange={(e) => field.onChange(unit)}
                        checked={field?.value === unit}
                      />
                      <label htmlFor={unit} className="ml-2">
                        {unit}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            />

            <Button
              type="submit"
              label={isEdit ? "Edit Task":"Add Task"}
              size="small"
              className="mt-4 "
              disabled={formState.isSubmitting}
            />
          </form>
        </div>
      </Dialog>
    </>
  );
}

