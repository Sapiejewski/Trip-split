import {
  Avatar,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CreateUserModal from "../modals/CreateUserModal";
const url = process.env.REACT_APP_API_URL;

const Users = () => {
  const [users, setUsers] = useState();

  const fetchUsers = () => {
    fetch(`${url}/user`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <CreateUserModal fetchUsers={fetchUsers} />
      <div>
        {users ? (
          <Table className="" aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Avatar</TableColumn>
              <TableColumn>Nazwa</TableColumn>
              <TableColumn>E-Mail</TableColumn>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar name={user.payer} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            {/* <TableBody emptyContent={"No rows to display."}>{[]}</TableBody> */}
          </Table>
        ) : (
          <h1>Nie ma żadnych uczestników</h1>
        )}
      </div>
    </>
  );
};

export default Users;
