import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  AvatarGroup,
  Avatar,
  Tooltip,
} from "@nextui-org/react";

const sampleData = [
  {
    id: 1,
    amount: 100,
    title: "Dinner",
    payer: "John Doe",
    participants: ["Alice", "Bob", "Charlie"],
    date: "2024-01-08",
  },
  {
    id: 2,
    amount: 50,
    title: "Lunch",
    payer: "Alice",
    participants: ["John Doe", "Charlie"],
    date: "2024-01-09",
  },
  {
    id: 3,
    amount: 120,
    title: "Shopping",
    payer: "Bob",
    participants: ["John Doe", "Alice"],
    date: "2024-01-10",
  },
  {
    id: 4,
    amount: 80,
    title: "Movie Night",
    payer: "Charlie",
    participants: ["John Doe", "Alice", "Bob"],
    date: "2024-01-11",
  },
  // Add more sample expense objects as needed
];

const ExpansesTable = () => {
  const [expanses, setExpanses] = useState(sampleData);

  return (
    <Table className="" aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>KWOTA</TableColumn>
        <TableColumn>TYTUŁ</TableColumn>
        <TableColumn>KTO PŁACIŁ</TableColumn>
        <TableColumn>UCZESTNICY</TableColumn>
        <TableColumn>DATA</TableColumn>
      </TableHeader>
      <TableBody>
        {expanses.map((expanse) => (
          <TableRow key={expanse.id}>
            <TableCell>{expanse.amount} PLN</TableCell>
            <TableCell>{expanse.title}</TableCell>
            <TableCell>
              <Tooltip content={expanse.payer} placement="left">
                <Avatar name={expanse.payer} />
              </Tooltip>
            </TableCell>
            <TableCell>
              <AvatarGroup className="flex justify-start">
                {expanse.participants.map((participant) => (
                  <Tooltip content={participant} placement="bottom">
                    <Avatar name={participant} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </TableCell>
            <TableCell>{expanse.date}</TableCell>
          </TableRow>
        ))}

        {/* {expanses.map((expanse) => (
          <TableRow key={expanse.id}>
            <TableCell>{expanse.amount} PLN</TableCell>
            <TableCell>{expanse.title}</TableCell>
            <Avatar name={expanse.payer} />
            <TableCell>
              <AvatarGroup className="flex justify-start">
                {expanse.participants.map((participant) => (
                  <Avatar name={participant} />
                ))}
              </AvatarGroup>
            </TableCell>
            <TableCell>{expanse.date}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>

      {/* <TableBody emptyContent={"No rows to display."}>{[]}</TableBody> */}
    </Table>
  );
};

export default ExpansesTable;
