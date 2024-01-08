import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Avatar,
  SelectSection,
} from "@nextui-org/react";
import { useState } from "react";

const AddNewExpanseModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Filip",
    },
    {
      id: 2,
      name: "Arek",
    },
    {
      id: 3,
      name: "Kuba",
    },
    {
      id: 4,
      name: "Kacper",
    },
    {
      id: 5,
      name: "Jarek",
    },
    {
      id: 6,
      name: "Filip",
    },
    {
      id: 7,
      name: "Arek",
    },
    {
      id: 8,
      name: "Kuba",
    },
    {
      id: 9,
      name: "Kacper",
    },
    {
      id: 10,
      name: "Jarek",
    },
  ]);
  return (
    <>
      <Button
        onPress={onOpen}
        className="max-w-40 self-end mb-6"
        size="lg"
        color="secondary"
      >
        Dodaj zakupy
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Dodaj nowy zakup
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Nazwa"
                  placeholder="Wpisz nazwę zakupu"
                  variant="bordered"
                />
                <div className="flex flex-row gap-2 mt-4">
                  <Input
                    type="number"
                    label="Price"
                    placeholder="0.00"
                    labelPlacement="outside"
                    variant="bordered"
                    className="w-1/2"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">PLN</span>
                      </div>
                    }
                  />
                  <Select
                    items={users}
                    label="Kto płacił"
                    placeholder="Wybierz osobę"
                    labelPlacement="outside"
                    className="w-1/2"
                  >
                    {(user) => (
                      <SelectItem key={user.id} textValue={user.name}>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            alt={user.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={user.avatar}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">{user.name}</span>
                            <span className="text-tiny text-default-400">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <Select
                  label="Uczestnicy"
                  placeholder="Wybierz osoby uczestniczące"
                  selectionMode="multiple"
                  className="max-w-xs"
                >
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  type="date"
                  label="Data"
                  labelPlacement="outside"
                  placeholder="Wybierz datę"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Anuluj
                </Button>
                <Button color="primary" onPress={onClose}>
                  Zapisz
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewExpanseModal;
