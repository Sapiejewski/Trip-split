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

const ExpansesTable = ({ expenses }) => {
  // console.log("ExpansesTable");
  // console.log(expenses);
  return (
    // <Table className="" aria-label="Example static collection table">
    //   <TableHeader>
    //     <TableColumn>KWOTA</TableColumn>
    //     <TableColumn>TYTUŁ</TableColumn>
    //     <TableColumn>KTO PŁACIŁ</TableColumn>
    //     <TableColumn>UCZESTNICY</TableColumn>
    //     <TableColumn>DATA</TableColumn>
    //   </TableHeader>
    //   <TableBody>
    //     {expenses?.map((expanse) => (
    //       <TableRow key={expanse.id}>
    //         <TableCell>{expanse.amount} PLN</TableCell>
    //         <TableCell>{expanse.title}</TableCell>
    //         <TableCell>
    //           <Tooltip content={expanse.payer} placement="left">
    //             <Avatar name={expanse.payer} />
    //           </Tooltip>
    //         </TableCell>
    //         <TableCell>
    //           <AvatarGroup className="flex justify-start">
    //             {expanse.participants.map((participant) => (
    //               <Tooltip content={participant} placement="bottom">
    //                 <Avatar name={participant} />
    //               </Tooltip>
    //             ))}
    //           </AvatarGroup>
    //         </TableCell>
    //         <TableCell>{expanse.date}</TableCell>
    //       </TableRow>
    //     ))}
    //   </TableBody>

    //   {/* <TableBody emptyContent={"No rows to display."}>{[]}</TableBody> */}
    // </Table>
    <div></div>
  );
};

export default ExpansesTable;
