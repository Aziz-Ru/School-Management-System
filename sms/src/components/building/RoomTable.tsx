import { RoomTableColumns } from "@/lib/table_columns";
import { Room } from "@/lib/types";
import TableList from "../TableList";
import { TableCell, TableRow } from "../ui/table";

const RoomTable = ({ rooms }: { rooms: Room[] }) => {
  const renderRow = (room: Room) => {
    return (
      <TableRow key={room.id}>
        <TableCell className="border-r">{room.roomNumber}</TableCell>
        <TableCell className="border-r">{room.floor}</TableCell>
        <TableCell className="border-r">{room.building}</TableCell>
        <TableCell>{room.capacity}</TableCell>
      </TableRow>
    );
  };

  return (
    <TableList renderRow={renderRow} columns={RoomTableColumns} data={rooms} />
  );
};

export default RoomTable;
