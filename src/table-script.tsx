import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import sourceData from "./source-data.json";
import type { SourceDataType, TableDataType } from "./types";

/**
 * Example of how a TableDataType object should be structured.
 *
 * Each `TableDataType` object has the following properties:
 * @prop {string} ticketId - The unique identifier for the ticket.
 * @prop {string} userId - The unique identifier for the user associated with the booking.
 * @prop {string} timeBooked - The time duration booked by the user, typically in hours or minutes.
 * @prop {string} bookingDate - The date when the booking was made, formatted as a string.
 */

const getUserId = (stringValue) => {
  return stringValue.split("/")[1].toString();
};

function getTicketNumber(stringValue) {
  if (stringValue) {
    const regex = /\[(SOL-\d+)\]/;
    const value = stringValue?.match(regex);
    console.log("value : ", value);
    return value ? value[1] : "";
  } else {
    return "";
  }
}

let groupedArray: any = [];

const tableData: TableDataType[] = (
  sourceData as unknown as SourceDataType[]
).map((dataRow, index) => {
  if (Object.keys(dataRow)[0] === "timelog") {
    let ticketId = getTicketNumber(dataRow?.timelog?.description);
    if (ticketId != "") {
      // groupedArray check ?    Update : Add
      if (groupedArray.find((element: any) => element.ticketId == ticketId)) {
        let index = groupedArray.findIndex(
          (element: any) => element.ticketId == ticketId
        );
        groupedArray[index].hour =
          parseInt(groupedArray[index].hour) +
          parseInt(dataRow?.timelog?.duration);
      } else {
        let hourVal = parseInt(dataRow?.timelog?.duration);
        groupedArray.push({
          ticketId: ticketId,
          hour: hourVal,
        });
      }
      //Adding into global array for displying grouped data
      const userId = getUserId(dataRow?.timelog?.person);
      const row: TableDataType = {
        ticketId,
        userId,
        bookingDate: `${dataRow?.timelog?.date}`,
        timeBooked: `${dataRow?.timelog?.duration}`,
      };
      return row;
    }
  } else {
    console.log("Else case");
  }
});

groupedArray.forEach((element: any) => {
  let combinedTicketId = "Based on combined ticket : " + element.ticketId;
  const row: TableDataType = {
    ticketId: combinedTicketId,
    userId: "",
    bookingDate: "",
    timeBooked: element.hour,
  };
  tableData.push(row);
});

const extractNumber = (id) => {
  const match = id.match(/SOL-(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const filteredArray = tableData.filter((element) => element != undefined);
console.log("filteredArray : ", filteredArray);
console.log("groupedArray : ", groupedArray);

filteredArray.sort((a, b) => {
  const numA = parseInt(a.ticketId.match(/\d+/)[0], 10);
  const numB = parseInt(b.ticketId.match(/\d+/)[0], 10);
  return numA - numB;
});

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<TableDataType>[]>(
    () => [
      {
        accessorKey: "ticketId",
        header: "Ticket Id",
      },
      {
        accessorKey: "userId",
        header: "User Id",
      },
      {
        accessorKey: "bookingDate",
        header: "Booking Date",
      },
      {
        accessorKey: "timeBooked",
        header: "Time Booked",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredArray,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
