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
import { useEffect, useState } from "react";

const url = process.env.REACT_APP_API_URL;

const AddNewExpanseModal = ({ users, tripId, fetchExpenses }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [selectedPayer, setSelectedPayer] = useState();
  const [selectedUsers, setSelectedUsers] = useState();
  const [date, setDate] = useState();

  const handleSubmit = () => {
    const data = {
      trip: tripId,
      name: name,
      amount: price,
      payer: selectedPayer,
      date: date,
    };
    fetch(`${url}/expense/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        onOpenChange();
        fetchExpenses();
      } else {
        console.log("error");
      }
    });
  };

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="flex flex-row gap-2 mt-4">
                  <Input
                    type="number"
                    label="Price"
                    placeholder="0.00"
                    labelPlacement="outside"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                    value={selectedPayer}
                    onChange={(e) => setSelectedPayer(e.target.value)}
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
                  value={selectedUsers}
                  onChange={(e) => setSelectedUsers(e.target.value)}
                >
                  {users?.map((user) => (
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
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Anuluj
                </Button>
                <Button color="primary" onPress={handleSubmit}>
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
