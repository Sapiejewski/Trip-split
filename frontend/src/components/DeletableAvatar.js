import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
const url = process.env.REACT_APP_API_URL;

const DeletableAvatar = ({ user, fetchUsers, tripId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const name = user.name;
  const userId = user.id;
  const deleteTripUser = (userId) => {
    fetch(`${url}/trip/${tripId}/remove_user/${userId}/`, {
      method: "DELETE",
    }).then(() => fetchUsers());
  };

  const handleDeleteUser = () => {
    deleteTripUser(userId);
    fetchUsers();
    onOpenChange();
  };

  return (
    <>
      <Tooltip content={name} placement="bottom">
        <Avatar onClick={onOpen} className="cursor-pointer" name={name} />
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Czy na pewno chcesz usunąć {user.name}?
              </ModalHeader>
              <ModalFooter>
                <Button color="default" variant="" onPress={onClose}>
                  Zamknij
                </Button>
                <Button color="danger" onPress={handleDeleteUser}>
                  Usuń uczestnika
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeletableAvatar;
