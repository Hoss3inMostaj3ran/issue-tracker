import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

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
      <ul>
        <li>
          <span>Issue: </span>
          {issue?.id}
        </li>
        <li>
          <span>Title: </span>
          {issue?.title}
        </li>
        <li>
          <span>Description: </span>
          {issue?.description}
        </li>
        <li>
          <span>Created Date: </span>
          {issue?.createdAt.toDateString()}
        </li>
      </ul>
    </div>
  );
};

export default IssuesDetailPage;
