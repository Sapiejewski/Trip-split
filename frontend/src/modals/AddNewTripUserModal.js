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

const AddNewTripUserModal = ({ user, handleUserChange, handleUserClick }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip content="Dodaj uczestnika" placement="bottom">
        <Avatar
          onClick={onOpen}
          color="primary"
          classNames={{
            base: "primary",
          }}
          className="cursor-pointer"
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

export default AddNewTripUserModal;
