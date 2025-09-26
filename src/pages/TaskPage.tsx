import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSidebarmenuStore } from "../logic/SidebarMenu";

type taskFilterType = 'Tutte' | 'Attive'

export function Taskpage() {
    let params = useParams();
    const {routes, addTask, completeTask} = useSidebarmenuStore((state) => state)
    const [openModal, setOpenModal] = useState(false);
    const [taskName, setTaskName] = useState<string>("")
    const [taskFilter, setTaskFilter] = useState<taskFilterType>("Tutte")

        function createTask() {
            setOpenModal(false)
            addTask(params.taskId!, taskName)
            setTaskName("")
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
             <ButtonGroup>
                <Button color="alternative" onClick={() => setTaskFilter("Tutte")}>Tutte</Button>
                <Button color="alternative" onClick={() => setTaskFilter("Attive")}>Attive</Button>
            </ButtonGroup>
            {
              taskFilter == "Tutte" ?
              routes.filter(route => route.text == params.taskId)
              .map(route => 
                route.tasks.map(task =>
                  <article className="flex gap-2 items-center">
                    <input type="checkbox" checked={task.isCompleted} onClick={() => completeTask(params.taskId!, task.text)}/>
                    <p key={task.text}>{task.text}</p>
                  </article>
             
              )) :
              routes.filter(route => route.text == params.taskId)
              .map(route => 
                route.tasks.map(task =>
                  task.isCompleted ? 
                  <article className="flex gap-2 items-center">
                    <input type="checkbox" checked />
                    <p key={task.text}>{task.text}</p>
                  </article> : <></>
              ))
            }
        </section>
    );
}