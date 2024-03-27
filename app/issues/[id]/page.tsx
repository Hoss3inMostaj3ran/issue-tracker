import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import SelectorClient from "./SelectorClient";

interface Props {
  params: { id: string };
}

const IssuesDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

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
      {session && (
        <Box p="5" mt="3">
          <Flex direction="column" gap="3">
            <SelectorClient issue={issue} />
            <EditButton id={parseInt(id)} />
            <DeleteButton id={parseInt(id)} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssuesDetailPage;

export async function generateMetaData({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}
