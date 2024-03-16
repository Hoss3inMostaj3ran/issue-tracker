import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";

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
      <Box id="issue-details">
        <IssueDetails issue={issue} />
      </Box>
      <Box p="5">
        <EditButton id={parseInt(id)} />
      </Box>
    </Grid>
  );
};

export default IssuesDetailPage;
