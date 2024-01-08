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
} from "@nextui-org/react";
const url = process.env.REACT_APP_API_URL;

const ExpansesTable = ({ tripId }) => {
  const [expenses, setExpenses] = useState();

  const fetchExpenses = () => {
    fetch(`${url}/trip/${tripId}/expenses/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const convertDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  if (!expenses) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Table className="" aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>KWOTA</TableColumn>
          <TableColumn>TYTUŁ</TableColumn>
          <TableColumn>KTO PŁACIŁ</TableColumn>
          <TableColumn>UCZESTNICY</TableColumn>
          <TableColumn>DATA</TableColumn>
        </TableHeader>
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
            </TableRow>
          ))}
        </TableBody>

        {/* <TableBody emptyContent={"No rows to display."}>{[]}</TableBody> */}
      </Table>
      {console.log(expenses)}
    </>
  );
};

export default ExpansesTable;

// {
//   expenses?.map((expense) => (
//     <TableRow key={expense.id}>
//       <TableCell>{expense.amount} PLN</TableCell>
//       <TableCell>{expense.title}</TableCell>
//       <TableCell>
//         <Tooltip content={expense.payer} placement="left">
//           <Avatar name={expense.payer} />
//         </Tooltip>
//       </TableCell>
//       <TableCell>
//         <AvatarGroup className="flex justify-start">
//           {expense.participants.map((participant) => (
//             <Tooltip content={participant} placement="bottom">
//               <Avatar name={participant} />
//             </Tooltip>
//           ))}
//         </AvatarGroup>
//       </TableCell>
//       <TableCell>{expense.date}</TableCell>
//     </TableRow>
//   ));
// }
