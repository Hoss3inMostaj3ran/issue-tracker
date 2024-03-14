import { Status } from "@prisma/client";
import { ColorSchemeEnum } from "next/dist/lib/metadata/types/metadata-types";

interface Props {
  status: Status;
}
/** Mark Zackerburg Way */
/*
const statusMapping: Record<
  Status,
  { lable: string; color: "red" | "green" | "violent" }
> = {
  OPEN: { lable: "Open", color: "red" },
  CLOSE: { lable: "Close", color: "green" },
  IN_PROGRESS: { lable: "InProgress", color: "violent" },
};
*/

const StatusBadge = ({ status }: Props) => {
  // Mark ZackerBurg Way
  /*
  <div
    className="badge badge-outline badge-md"
    color={statusMapping[status].color}
  >
    {statusMapping[status].lable}
  </div>;
    */
  /** Simple Way */

  if (status === "OPEN")
    return (
      <div className="badge badge-outline badge-md text-violet-600">Open</div>
    );
  else if (status === "CLOSE")
    return <div className="badge badge-outline text-red-600">Close</div>;
  else
    return (
      <div className="badge badge-outline  text-green-600">InProgress</div>
    );
};

export default StatusBadge;
