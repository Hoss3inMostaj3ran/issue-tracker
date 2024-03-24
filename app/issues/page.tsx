import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueFilter from "./_components/IssueFilter";
import NewIssueBtn from "./NewIssueBtn";
import { Table } from "@radix-ui/themes";
import StatusBadge from "./StatusBadge";
import Link from "next/link";
import { LuArrowUpWideNarrow } from "react-icons/lu";

type Props = {
  searchParams: { status: Status; orderBy: keyof Issue };
};

const page = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const checkStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: checkStatus,
    },
  });

  const tableColumns: {
    lable: string;
    value: keyof Issue;
  }[] = [
    { lable: "Issue", value: "title" },
    { lable: "Status", value: "status" },
    { lable: "Created", value: "createdAt" },
  ];

  return (
    <div className="p-5">
      <div className="flex flex-row justify-between align-baseline">
        <NewIssueBtn />
        <IssueFilter />
      </div>
      <div className="overflow-x-auto my-5">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {tableColumns.map((col) => (
                <Table.ColumnHeaderCell key={col.value}>
                  <Link
                    href={{ query: { ...searchParams, orderBy: col.value } }}
                  >
                    {col.lable}
                    {searchParams.orderBy === col.value && (
                      <LuArrowUpWideNarrow className="inline-block mx-1" />
                    )}
                  </Link>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((i) => (
              <Table.Row key={i.id}>
                <Table.ColumnHeaderCell>
                  <Link href={`issues/${i.id}`}>{i.title}</Link>
                </Table.ColumnHeaderCell>
                <Table.Cell>
                  <StatusBadge status={i.status} />
                </Table.Cell>
                <Table.Cell>{i.createdAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
