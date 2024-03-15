import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import StatusBadge from "../StatusBadge";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssuesDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) notFound();

  return (
    <div>
      <div className="stats shadow flex lg:flex-row max-lg:flex-col">
        <div className="stat flex-1">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Issue ID</div>
          <div className="stat-value">{issue?.id}</div>
        </div>
        <div className="stat flex-1">
          <div className="stat-figure text-secondary">
            {<StatusBadge status={issue.status} />}
          </div>
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title">Title :</div>
          <div className="stat-value">{issue?.title}</div>
        </div>
        <div className="stat flex-1">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Created Date :</div>
          <div className="stat-value">{issue?.createdAt.toDateString()}</div>
        </div>
        <div className="stat flex-auto">
          <div className="stat-title">Description :</div>
          <ReactMarkdown className="stat">{issue?.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default IssuesDetailPage;
