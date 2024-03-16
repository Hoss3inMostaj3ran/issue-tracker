import ReactMarkdown from "react-markdown";
import StatusBadge from "../StatusBadge";
import { Issue } from "@prisma/client";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-medium mb-4">Issue Details</h1>
        <p className="text-gray-600 mb-2 font-medium">
          Issue ID: <span className="text-blue-500">{issue?.id}</span>
        </p>
        <p className="text-gray-600 mb-2 font-medium">
          Issue Title: <span className="text-blue-500">{issue?.title}</span>
        </p>
        <p className="text-gray-600 mb-2 font-medium">
          Status:{" "}
          <span className=" mx-3">{<StatusBadge status={issue.status} />}</span>
        </p>
        <p className="text-gray-600 mb-2 font-medium">
          Created Date:{" "}
          <span className="text-blue-500">
            {issue?.createdAt.toDateString()}
          </span>
        </p>
        <p className="text-gray-600 mb-2 font-medium">
          Description:{" "}
          <ReactMarkdown className="text-gray-800 prose ">
            {issue?.description}
          </ReactMarkdown>
        </p>
      </div>
    </div>
  );
};

export default IssueDetails;
