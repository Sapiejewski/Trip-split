import React, { useEffect, useState } from "react";
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
  User,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../images/icons/VerticalDotsIcon";
const url = process.env.REACT_APP_API_URL;

const convertDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};

const ExpansesTable = ({ expenses, fetchExpenses }) => {
  const deleteExpense = (expenseId) => {
    fetch(`${url}/expense/${expenseId}/remove_expense/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      fetchExpenses();
    });
  };

  return (
    <>
      <Table className="" aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>KWOTA</TableColumn>
          <TableColumn>TYTUŁ</TableColumn>
          <TableColumn>KTO PŁACIŁ</TableColumn>
          <TableColumn>UCZESTNICY</TableColumn>
          <TableColumn>DATA</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        {expenses ? (
          <TableBody>
            {expenses?.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.name}</TableCell>
                <TableCell>
                  <User
                    name={expense.payer_details.name}
                    description={expense.payer_details.email}
                  />
                </TableCell>
                <TableCell>
                  <AvatarGroup max={8}>
                    {expense.participants_details.map((user) => (
                      <Tooltip content={user.name} placement="bottom">
                        <Avatar name={user.name} />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell>{convertDate(expense.date)}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="light" size="sm">
                        <Tooltip content="Szczegóły">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <VerticalDotsIcon />
                          </span>
                        </Tooltip>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() => {
                          deleteExpense(expense.id);
                        }}
                      >
                        Delete file
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </>
  );
};

export default ExpansesTable;
