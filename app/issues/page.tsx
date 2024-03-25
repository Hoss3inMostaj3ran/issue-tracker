import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { LuArrowUpWideNarrow } from "react-icons/lu";
import Pagination from "../components/Pagination";
import IssueFilter from "./_components/IssueFilter";
import NewIssueBtn from "./NewIssueBtn";
import StatusBadge from "./StatusBadge";

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
};

const page = async ({ searchParams }: Props) => {
  const pageSize = 10;
  let page = 1;
  if (!isNaN(parseInt(searchParams.page))) {
    page = parseInt(searchParams.page);
  }

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const tableColumns: {
    lable: string;
    value: keyof Issue;
  }[] = [
    { lable: "Issue", value: "title" },
    { lable: "Status", value: "status" },
    { lable: "Created", value: "createdAt" },
  ];

  const orderbyAsc: boolean = true;

  let orderBy;

  if (orderbyAsc === true) {
    orderBy = tableColumns
      .map((col) => col.value)
      .includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: "asc" }
      : undefined;
  } else {
    orderBy = tableColumns
      .map((col) => col.value)
      .includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: "des" }
      : undefined;
  }

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalIssues = await prisma.issue.count({
    where: { status: status },
  });
  return (
    <>
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

      <Pagination
        currentPage={parseInt(searchParams.page)}
        itemsCount={totalIssues}
        pageSize={pageSize}
      />
    </>
  );
};

export const dynamic = "force-dynamic";

export default page;
