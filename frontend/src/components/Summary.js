import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  User,
} from "@nextui-org/react";
import React from "react";

const Summary = ({ users }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold mt-10">Podsumowanie należności</h1>
      <div className="flex flex-wrap gap-3 mt-5">
        {users?.map((user) => (
          <Card className="mt-5 p-3 w-fit">
            <CardHeader>
              <User name={user.name} description={user.email} />
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-2">
                <Transfer amount={24} userId={2} />
                <Transfer amount={120} userId={2} />
                <Transfer amount={2} userId={2} />
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex w-full justify-between text-[#71717A]">
                <p className="pr-4">W sumie: </p>
                <p className="">72 PLN</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

const Transfer = ({ amount, userId }) => {
  return (
    <div className="pl-3 flex flex-row gap-3">
      <div className="flex flex-row items-center gap-3">
        <div className="flex items-center text-sm">
          <Chip color="primary" variant="flat">
            {amount} PLN
          </Chip>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
        <Chip
          variant="bordered"
          avatar={
            <Avatar
              name="Filip"
              size="sm"
              getInitials={(name) => name.charAt(0)}
            />
          }
        >
          Filip
        </Chip>
      </div>
    </div>
  );
};

export default Summary;
