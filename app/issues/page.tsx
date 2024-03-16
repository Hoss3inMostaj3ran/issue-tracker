import IssuesTable from "./IssuesTable";

const page = async () => {
  return (
    <div className="p-5">
      <IssuesTable />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
