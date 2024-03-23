import { Status } from "@prisma/client";
import IssueFilter from "./_components/IssueFilter";
import IssuesTable from "./IssuesTable";
import NewIssueBtn from "./NewIssueBtn";
import prisma from "@/prisma/client";

type Props = {
  searchParams: { status: Status };
};

const page = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const checkStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: checkStatus,
    },
  });

  return (
    <div className="p-5">
      <div className="flex flex-row justify-between align-baseline">
        <NewIssueBtn />
        <IssueFilter />
      </div>
      <IssuesTable issues={issues} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
