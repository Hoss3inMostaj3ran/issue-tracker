import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import StatusBadge from "../StatusBadge";
import ReactMarkdown from "react-markdown";
import { Box, Grid } from "@radix-ui/themes";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="3">
      <Box id="capilot">
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
              <span className=" mx-3">
                {<StatusBadge status={issue.status} />}
              </span>
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
      </Box>
      <Box p="5">
        <Link href={`/issues/${id}/edit`} className="btn btn-outline">
          <FaEdit />
          Edit
        </Link>
      </Box>
    </Grid>
  );
};

export default IssuesDetailPage;
