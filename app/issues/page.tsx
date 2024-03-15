import Link from "next/link";
import IssuesTable from "./IssuesTable";

const page = async () => {
  return (
    <div className="p-5">
      <IssuesTable />
    </div>
  );
};

export default page;
