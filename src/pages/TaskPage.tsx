import { Button, ButtonGroup, Checkbox, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSidebarmenuStore } from "../logic";
import { MdDelete } from "react-icons/md";

type taskFilterType = 'Tutte' | 'Attive' | "Da fare"

export function Taskpage() {
    const params = useParams();
    const {routes, addTask, completeTask, deleteTask} = useSidebarmenuStore((state) => state)
    const [openModal, setOpenModal] = useState(false);
    const [taskName, setTaskName] = useState<string>("")
    const [taskFilter, setTaskFilter] = useState<taskFilterType>("Tutte")

        function createTask() {
            setOpenModal(false)
            addTask(params.taskId!, taskName)
            setTaskName("")
        }

        function showTasks() {
          if (taskFilter == "Tutte") {
              return routes.filter(route => route.text == params.taskId)
              .map(route => 
                route.tasks.map(task =>
                  <article className="flex gap-8 items-center">
                    <Checkbox defaultChecked={task.isCompleted} onChange={() => completeTask(params.taskId!, task.text)}/>
                    <p key={task.text}>{task.text}</p>
                    <MdDelete onClick={() => deleteTask(params.taskId!, task.text)} />
                  </article>
             
              )) 
            } else if (taskFilter == "Attive") {
              return routes.filter(route => route.text == params.taskId)
              .map(route => 
                route.tasks.map(task =>
                  task.isCompleted ? 
                  <article className="flex gap-8 items-center">
                    <Checkbox defaultChecked onChange={() => completeTask(params.taskId!, task.text)} />
                    <p key={task.text}>{task.text}</p>
                    <MdDelete onClick={() => deleteTask(params.taskId!, task.text)} />
                  </article> : <></>
              ))
            } else {
              return routes.filter(route => route.text == params.taskId)
              .map(route => 
                route.tasks.map(task =>
                  task.isCompleted == false ? 
                  <article className="flex gap-8 items-center">
                    <Checkbox onChange={() => completeTask(params.taskId!, task.text)} />
                    <p key={task.text}>{task.text}</p>
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
                      <div className="space-y-6">
                        <TextInput 
                            type="text" 
                            placeholder="Inserici nuova scheda" 
                            value={taskName} 
                            onChange={(e)=>setTaskName(e.target.value)} 
                            required
                        />
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={createTask} color="green">Create</Button>
                      <Button color="red" onClick={() => setOpenModal(false)}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
            <h1>Sezione <span className="font-bold ">{params.taskId}</span></h1>
            <Button onClick={() => setOpenModal(true)} className="mt-2 mb-4">Aggiungi task</Button>
             <ButtonGroup className="mb-4">
                <Button color="alternative" onClick={() => setTaskFilter("Tutte")}>Tutte</Button>
                <Button color="alternative" onClick={() => setTaskFilter("Da fare")}>Da fare</Button>
                <Button color="alternative" onClick={() => setTaskFilter("Attive")}>Attive</Button>
            </ButtonGroup>
            {
              showTasks()
            }
        </section>
    );
}