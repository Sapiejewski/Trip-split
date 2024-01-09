import {
  Avatar,
  AvatarGroup,
  Card,
  Chip,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import ExpansesTable from "../components/ExpansesTable";
import AddNewExpanseModal from "../modals/AddNewExpanseModal";
import BackgroundPickerModal from "../modals/BackgroundPickerModal";
import AddNewTripUserModal from "../modals/AddNewTripUserModal";
import DeletableAvatar from "../components/DeletableAvatar";
import { useParams } from "react-router-dom";
import Summary from "../components/Summary";
const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context("../images/tripImages", false, /\.(png|jpe?g|svg)$/)
);

const url = process.env.REACT_APP_API_URL;

const Trip = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [date_start, setDate_start] = useState("");
  const [date_end, setDate_end] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [imageId, setImageId] = useState(0);
  const [totalExpanses, setTotalExpanses] = useState(0);
  const url = process.env.REACT_APP_API_URL;

  const { tripId } = useParams();

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
        setUsers(data.people_details);
        setTotalExpanses(data.total_expenses);
        if (data.background) setImageId(data.background);
      });
    fetchExpenses();
  }, []);

  const fetchUsers = () => {
    fetch(`${url}/trip/${tripId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.people_details));
  };

  const fetchExpenses = () => {
    fetch(`${url}/trip/${tripId}/expenses/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  };

  return (
    <>
      <div className="w-full">
        <img src={images[imageId]} className="w-full h-60 object-cover" />
        <div className="flex justify-end w-full">
          <BackgroundPickerModal setImage={setImageId} />
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
                    {/* <p className="bg-primary px-5 py-1 rounded-md shadow-sm self-end"> */}
                    <Chip
                      className="self-end"
                      size="lg"
                      color="primary"
                      variant="shadow"
                    >
                      Koszt:&nbsp;
                      <p className="font-semibold inline">
                        {totalExpanses} PLN
                      </p>
                    </Chip>
                    {/* </p> */}
                  </div>
                </Card>
              </div>
              <div className="md:w-[50%] relative bottom-5 md:top-0 ">
                <AvatarGroup max={8}>
                  {users?.map((user) => (
                    <DeletableAvatar
                      user={user}
                      fetchUsers={fetchUsers}
                      tripId={tripId}
                    />
                  ))}
                  <AddNewTripUserModal
                    tripId={tripId}
                    fetchUsers={fetchUsers}
                  />
                </AvatarGroup>
              </div>
            </div>
            <div className="flex w-full pt-0 p-4 md:bottom-24 relative flex-col ">
              <AddNewExpanseModal
                users={users}
                tripId={tripId}
                fetchExpenses={fetchExpenses}
              />
              <ExpansesTable
                expenses={expenses}
                fetchExpenses={fetchExpenses}
              />
              <Summary users={users} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trip;
