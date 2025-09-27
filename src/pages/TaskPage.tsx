import { Badge, Button, ButtonGroup, Checkbox, Modal, ModalBody, ModalFooter, ModalHeader, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSidebarmenuStore } from "../logic";
import { MdDelete } from "react-icons/md";
import type { importance } from "../logic/useSidebarMenuStore";

type taskFilterType = 'Tutte' | 'Fatte' | "Da fare"

interface taskData {
  name: string,
  importance: importance
}
export function Taskpage() {
    const params = useParams();
    const {routes, addTask, completeTask, deleteTask} = useSidebarmenuStore((state) => state)
    const [openModal, setOpenModal] = useState(false);
    const [taskData, setTaskData] = useState<taskData>({name: "", importance: "Not important"})
    const [taskFilter, setTaskFilter] = useState<taskFilterType>("Tutte")

        function createTask() {
            setOpenModal(false)
            addTask(params.taskId!, taskData.name, taskData.importance)
            setTaskData({name: "", importance: "Not important"})
        }

        function showTasks() {

          if (taskFilter == "Tutte") {
              return routes.filter(route => route.text == params.taskId)
              .map(route => 
                route.tasks.map(task =>
                  <article className="flex gap-8 items-center mb-4" key={task.text}>
                    <Checkbox defaultChecked={task.isCompleted} onChange={() => completeTask(params.taskId!, task.text)}/>
                    <p key={task.text}>{task.text}</p>
                    <Badge color={task.importance == "Important" ? "red" : "green" }>{task.importance}</Badge>
                    <MdDelete onClick={() => deleteTask(params.taskId!, task.text)} />
                  </article>
              )) 
            } else if (taskFilter == "Fatte") {
              return routes.filter(route => route.text == params.taskId)
              .map(route => 
                route.tasks.map(task =>
                  task.isCompleted ? 
                  <article className="flex gap-8 items-center mb-4" key={task.text}>
                    <Checkbox defaultChecked onChange={() => completeTask(params.taskId!, task.text)} />
                    <p key={task.text}>{task.text}</p>
                    <Badge color={task.importance == "Important" ? "red" : "green" }>{task.importance}</Badge>
                    <MdDelete onClick={() => deleteTask(params.taskId!, task.text)} />
                  </article> : <></>
              ))
            } else {
              return routes.filter(route => route.text == params.taskId)
              .map(route => 
                route.tasks.map(task =>
                  task.isCompleted == false ? 
                  <article className="flex gap-8 items-center mb-4" key={task.text}>
                    <Checkbox onChange={() => completeTask(params.taskId!, task.text)} />
                    <p key={task.text}>{task.text}</p>
                                        <Badge color={task.importance == "Important" ? "red" : "green" }>{task.importance}</Badge>

                    <MdDelete onClick={() => deleteTask(params.taskId!, task.text)} />
                  </article> : <></>
              ))
            }
        }
    return (
        <section>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <ModalHeader>Crea nuova task</ModalHeader>
                    <ModalBody>
                      <div className="space-y-6 mb-4">
                        <TextInput 
                            type="text" 
                            placeholder="Nome della task" 
                            value={taskData.name} 
                            onChange={(e)=>setTaskData({...taskData, name: e.target.value})} 
                            required
                        />
                      </div>
                      <Select required onChange={(e)=>setTaskData({...taskData, importance: e.target.value == "Important" ? "Important" : "Not important"})}>
                        <option value="Not important">Not important</option>
                        <option value="Important">Important</option>
                      </Select>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={createTask} color="green">Create</Button>
                      <Button color="red" onClick={() => setOpenModal(false)}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
            <h1 className="text-xl md:text-2xl">Sezione <span className="font-bold ">{params.taskId}</span></h1>
              <Button onClick={() => setOpenModal(true)} className="mt-2 mb-4">Aggiungi task</Button>
              <div className="flex justify-center items-center flex-col">
                          <ButtonGroup className="mb-4">
                              <Button color="alternative" onClick={() => setTaskFilter("Tutte")}>Tutte</Button>
                              <Button color="alternative" onClick={() => setTaskFilter("Da fare")}>Da fare</Button>
                              <Button color="alternative" onClick={() => setTaskFilter("Fatte")}>Fatte</Button>
                          </ButtonGroup>
                          {
                            showTasks()
                          }
              </div>
        </section>
    );
}