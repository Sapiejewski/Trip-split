import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import plusIcon from "../images/add.png";
import { animate } from "framer-motion";

const url = process.env.REACT_APP_API_URL;

const AddNewTripUserModal = ({ tripId, fetchUsers }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [allusers, setAllUsers] = useState();
  const [selectedUser, setselectedUser] = useState();

  const data = {
    trip: tripId,
    user: selectedUser,
  };

  const handleAddUser = () => {
    fetch(`${url}/trip_user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.status === 200 ? onOpenChange() : console.log("error");
      })
      .then(() => fetchUsers());
  };

  useEffect(() => {
    fetch(`${url}/user/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);

  return (
    <>
      <Tooltip content="Dodaj uczestnika" placement="bottom">
        <Avatar
          onClick={onOpen}
          className="cursor-pointer"
          src={plusIcon}
          fallback={<plusIcon fill="#FFF" size={8} />}
        ></Avatar>
      </Tooltip>
      <plusIcon fill="primary" size={32} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Dodaj nowego członka wycieczki
              </ModalHeader>
              <ModalBody>
                <Select
                  onChange={(event) => setselectedUser(event.target.value)}
                  label="Wybierz uczestnika"
                  className="max-w-xs"
                >
                  {allusers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Zamknij
                </Button>
                <Button color="primary" onPress={handleAddUser}>
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

export default AddNewTripUserModal;
