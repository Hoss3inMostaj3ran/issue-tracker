import Link from "next/link";
import IssuesTable from "./IssuesTable";
import delay from "delay";
import NewIssueBtn from "./NewIssueBtn";

const page = async () => {
  await delay(2000);
  return (
    <div className="p-5">
      <IssuesTable />
    </div>
  );
};

export default page;
