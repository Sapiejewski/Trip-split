import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import plusIcon from "../images/icons/plusIcon.js";
import { useEffect, useState } from "react";
const url = process.env.REACT_APP_API_URL;

const CreateUserModal = ({ fetchUsers }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleUserChange = (e, key) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  const handleUserClick = () => {
    fetch(`${url}/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      res.status === 200 ? onOpenChange() : console.log("error");
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [isOpen]);

  return (
    <>
      <Button onClick={onOpen} color="secondary" variant="bordered">
        Dodaj uczestnika
      </Button>
      <plusIcon fill="primary" size={32} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Dodaj nowego członka wycieczki
              </ModalHeader>
              <ModalBody>
                <h1 className="font-bold text-lg">Imię</h1>
                <Input
                  value={user.name}
                  onChange={(e) => handleUserChange(e, "name")}
                  size="lg"
                  type="text"
                  variant="bordered"
                  classNames={{ input: "bg-transparent" }}
                />
                <h1 className="font-bold text-lg">Email</h1>
                <Input
                  value={user.email}
                  onChange={(e) => handleUserChange(e, "email")}
                  size="lg"
                  type="email"
                  variant="bordered"
                  classNames={{ input: "bg-transparent" }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Zamknij
                </Button>
                <Button color="primary" onPress={handleUserClick}>
                  Dodaj
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUserModal;
