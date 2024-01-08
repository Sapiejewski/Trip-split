import { Avatar, AvatarGroup, Card, Tooltip } from "@nextui-org/react";

import image from "./../images/tripImages/img.jpg";
import { useEffect, useState } from "react";
import ExpansesTable from "../components/ExpansesTable";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import AddNewExpanseModal from "../modals/AddNewExpanseModal";
import BackgroundPickerModal from "../modals/BackgroundPickerModal";
import AddNewTripUserModal from "../modals/AddNewTripUserModal";
import { useParams } from "react-router-dom";
const url = process.env.REACT_APP_API_URL;

const Trip = () => {
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([
    "Filip",
    "Arek",
    "Kuba",
    "Kacper",
    "Jarek",
  ]);
  const [name, setName] = useState("");
  const [date_start, setDate_start] = useState("");
  const [date_end, setDate_end] = useState("");

  const { tripId } = useParams();

  const handleUserChange = (e, key) => {
    setNewUser((prevState) => ({
      ...prevState,
      [key]: e.target.value,
      trip: tripId,
    }));
  };

  const handleUserClick = () => {
    fetch(`${url}/trip_user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  };
  useEffect(() => {
    fetch(`${url}/trip/${tripId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDate_start(data.date_start);
        setDate_end(data.date_end);
      });
  }, []);

  console.log(tripId);

  // useEffect(() => {
  //   fetch("http://localhost:8000/user", {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setUsers(data);
  //     });
  // }, []);

  return (
    <>
      <div className="w-full">
        <img src={image} className="w-full h-60 object-cover" />
        <div className="flex justify-end w-full">
          <BackgroundPickerModal />
        </div>
        <div className="w-full flex justify-center">
          <div className="flex-col flex container">
            <div className="flex justify-between flex-col md:flex-row p-4">
              <div className="md:w-[50%] justify-center flex">
                <Card className="p-6 md:min-w-[400px] sm:w-[80%] w-full relative bottom-20">
                  <div className="flex flex-col items-start justify-center">
                    <h1 className="text-2xl md:text-4xl font-bold mb-5">
                      {name}
                    </h1>
                    <p className="text-sm pl-4 mb-3">
                      {date_start} - {date_end}
                    </p>
                    <p className="bg-primary px-5 py-1 rounded-md shadow-sm self-end">
                      Koszt:&nbsp;
                      <p className="font-semibold inline">300 PLN</p>
                    </p>
                  </div>
                </Card>
              </div>
              <div className="md:w-[50%] relative bottom-5 md:top-0 ">
                <AvatarGroup max={8}>
                  {users.map((user) => (
                    <Tooltip content={user} placement="bottom">
                      <button>
                        <Avatar name={user} />
                      </button>
                    </Tooltip>
                  ))}
                  <Tooltip content="adduser" placement="bottom">
                    <AddNewTripUserModal
                      user={newUser}
                      handleUserChange={handleUserChange}
                      handleUserClick={handleUserClick}
                    />
                  </Tooltip>
                </AvatarGroup>
              </div>
            </div>
            <div className="flex w-full pt-0 p-4 md:bottom-24 relative flex-col ">
              <AddNewExpanseModal />
              <ExpansesTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trip;
