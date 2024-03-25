import prisma from "@/prisma/client";
import Link from "next/link";
import StatusBadge from "../../components/StatusBadge";

const SimpleTable = async () => {
  const issues = await prisma.issue.findMany({});

  return (
    <div>
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
              <td onClick={() => {}}>
                <StatusBadge status={i.status} />
              </td>
              <td onClick={() => {}}>{i.createdAt.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
