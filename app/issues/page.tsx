import { Status } from "@prisma/client";
import IssueFilter from "./_components/IssueFilter";
import IssuesTable from "./IssuesTable";
import NewIssueBtn from "./NewIssueBtn";
import prisma from "@/prisma/client";
import StatusBadge from "./StatusBadge";
import Link from "next/link";

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
      <div className="overflow-x-auto">
        <table className="table table-zebra mb-5">
          {/* head */}
          <thead>
            <tr className="text-base-content font-sans text-lg">
              <th></th>
              <th>Issues</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((i) => (
              <tr key={i.id} className="hover">
                <td>{i.id}</td>
                <th>
                  <Link href={`issues/${i.id}`}>{i.title}</Link>
                </th>
                <td>
                  <StatusBadge status={i.status} />
                </td>
                <td>{i.createdAt.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
