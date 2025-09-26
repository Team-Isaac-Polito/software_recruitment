
"use client";
import { Button, Drawer, DrawerItems, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react";
import { HiHashtag, HiHome, HiMenu, HiPlus } from "react-icons/hi";
import { useSidebarmenuStore } from "../../logic/SidebarMenu";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";

export function MySidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
    const {routes, addRoute, removeRoute} = useSidebarmenuStore(
        (state) => state
    )
    const [openModal, setOpenModal] = useState(false);
    const [routeName, setRouteName] = useState<string>("")

    function createRoute() {
        setOpenModal(false)
        addRoute(routeName)
        setRouteName("")
    }
  return (
    <>
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="mb-4">Crea nuova task</ModalHeader>
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
    <Button onClick={() => setIsOpen(true)}>
      <HiMenu />
    </Button>
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerItems>
        <div>
            <Button onClick={() => setOpenModal(true)} className="mb-4 flex gap-4 items-center">
              <HiPlus />
              Crea nuova Raccolta
            </Button>
          <Button href="/" className="flex gap-4 items-center">
            <HiHome />
            Home Page
          </Button>
          {
            routes.map((elm, index) => {
                return <Link to={`/${elm.text}`} onClick={() => setIsOpen(false)}>
                <div key={index} className="w-full my-4">
                    <div className="flex justify-between items-center">
                      <HiHashtag />
                      {elm.text}
                    <MdDelete onClick={() => removeRoute(elm.text)}/>
                    </div>
                </div>
            </Link>
            })
          }
        </div>
      </DrawerItems>
    </Drawer>
    </>
  );
}
