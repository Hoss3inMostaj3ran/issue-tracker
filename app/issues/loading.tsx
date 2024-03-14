import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StatusBadge from "./StatusBadge";
import NewIssueBtn from "./NewIssueBtn";

const loading = () => {
  const issues = [1, 2, 3, 4];
  return (
    <div className="p-5">
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
            <tr key={i} className="hover">
              <td>
                <Skeleton />
              </td>
              <th>
                <Skeleton />
              </th>
              <td>
                <Skeleton />
              </td>
              <td>
                <Skeleton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NewIssueBtn />
    </div>
  );
};

export default loading;
