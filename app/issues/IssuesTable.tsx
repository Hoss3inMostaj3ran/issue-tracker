import prisma from "@/prisma/client";
import StatusBadge from "./StatusBadge";
import NewIssueBtn from "./NewIssueBtn";
import Link from "next/link";

const Issues = async () => {
  const issues = await prisma.issue.findMany({ take: 10 });

  return (
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
      <NewIssueBtn />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Issues;
