import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import StatusBadge from "../components/StatusBadge";
import { FaUserCircle } from "react-icons/fa";

type Props = {};

const LatestIssues = async (props: Props) => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedUser: true,
    },
  });

  return (
    <Card>
      <Heading my="3" mb="5" mx={"3"}>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((i) => (
            <Table.Row key={i.id}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex
                    direction="column"
                    justify={"center"}
                    align="start"
                    gap={"4"}
                  >
                    <Link className="font-semibold" href={`/issues/${i.id}`}>
                      <strong>{i.title}</strong>
                    </Link>
                    <StatusBadge status={i.status} />
                  </Flex>
                  <Flex>
                    {i.assignedUser && (
                      <Avatar
                        fallback={<FaUserCircle />}
                        size={"5"}
                        src={i.assignedUser.image!}
                      />
                    )}
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
