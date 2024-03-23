import IssueFilter from "./_components/IssueFilter";
import IssuesTable from "./IssuesTable";
import NewIssueBtn from "./NewIssueBtn";

const page = async () => {
  return (
    <div className="p-5">
      <div className="flex flex-row justify-between align-baseline">
        <NewIssueBtn />
        <IssueFilter />
      </div>
      <IssuesTable />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
