import prisma from "@/prisma/client";
import StatusBadge from "./StatusBadge";

const Issues = async () => {
  const issues = await prisma.issue.findMany({ take: 10 });

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
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
              <th>{i.title}</th>
              <td>
                <StatusBadge status={i.status} />
              </td>
              <td>{i.createdAt.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Issues;
