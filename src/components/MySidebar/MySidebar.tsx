
"use client";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, TextInput } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useSidebarmenuStore } from "../../logic/SidebarMenu";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

export function MySidebar() {
    const {routes, addRoute, removeRoute} = useSidebarmenuStore(
        (state) => state
    )
    const [openModal, setOpenModal] = useState(true);
    const [routeName, setRouteName] = useState<string>("")

    function createRoute() {
        setOpenModal(false)
        addRoute(routeName)
    }
  return (
    <>
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Crea nuova task</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <TextInput 
                type="text" 
                placeholder="Inserici nuova scheda" 
                value={routeName} 
                onChange={(e)=>setRouteName(e.target.value)} 
                required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={createRoute} color="green">Create</Button>
          <Button color="red" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    <Sidebar aria-label="Default sidebar example">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiPlus} onClick={() => setOpenModal(true)}>
            Create new Task
          </SidebarItem>
          {
            routes.map((elm, index) => {
                return <SidebarItem key={index} className="flex justify-between items-center">
                    {elm.text}
                    <MdDelete onClick={() => removeRoute(elm.text)}/>
                </SidebarItem>
            })
          }
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
    </>
  );
}
