import {
  Accordion,
  AccordionItem,
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Tooltip,
} from "@nextui-org/react";
import image from "./images/tripImages/img.jpg";
import { useEffect, useState } from "react";
import ExpansesTable from "./components/ExpansesTable";
import BackgroundPickerModal from "./components/backgroundPickerModal";
import AddNewExpanseModal from "./components/AddNewExpanseModal";

const Trip = () => {
  const [users, setUsers] = useState([
    "Filip",
    "Arek",
    // "Kuba",
    // "Kacper",
    // "Jarek",
  ]);

  //   useEffect(() => {
  //     fetch("http://localhost:8000/user", {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setUsers(data);
  //       });
  //   }, []);

  return (
    <>
      <div className="w-full">
        <img src={image} className="w-full h-60 object-cover" />
        <div className="flex justify-end w-full">
          <BackgroundPickerModal />
        </div>
        <div className=" px-4 lg:px-24">
          <div className="flex justify-between flex-col md:flex-row p-4">
            <div className="md:w-[50%] justify-center flex">
              <Card className="p-6 md:min-w-[400px] sm:w-[80%] w-full relative bottom-24">
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-2xl md:text-4xl font-bold mb-5">
                    Wakacje w Grecji
                  </h1>
                  <p className="text-sm pl-4 mb-3">2021.01.23 - 2021.01.30</p>
                  <p className="bg-primary px-5 py-1 rounded-md shadow-sm self-end">
                    Koszt:&nbsp;
                    <p className="font-semibold inline">300 PLN</p>
                  </p>
                </div>
              </Card>
            </div>
            <div className="md:w-[50%] ">
              <AvatarGroup>
                {users.map((user) => (
                  <Tooltip content={user} placement="bottom">
                    <Avatar name={user} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </div>
          </div>
          <div className="flex w-full pt-0 p-4 bottom-24 relative flex-col ">
            <AddNewExpanseModal />
            <ExpansesTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Trip;
