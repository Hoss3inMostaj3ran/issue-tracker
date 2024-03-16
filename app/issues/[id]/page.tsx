import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";

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
    <Grid columns={{ initial: "1", sm: "5" }}>
      <Box id="issue-details" className="col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box p="5">
        <Flex direction="column" gap="3">
          <EditButton id={parseInt(id)} />
          <DeleteButton id={parseInt(id)} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssuesDetailPage;
