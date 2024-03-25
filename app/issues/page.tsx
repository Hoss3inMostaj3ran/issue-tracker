import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueFilter from "./_components/IssueFilter";
import IssueTable, { IssueQuery, tableColumns } from "./_components/IssueTable";
import NewIssueBtn from "./NewIssueBtn";

type Props = {
  searchParams: IssueQuery;
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
      ? { [searchParams.orderBy]: "desc" }
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
    <div className="flex flex-col gap-2">
      <div>
        <div className="flex flex-row justify-between align-baseline">
          <NewIssueBtn />
          <IssueFilter />
        </div>
        <div className="overflow-x-auto my-5">
          <IssueTable issues={issues} searchParams={searchParams} />
        </div>
      </div>
      <div className="mx-auto">
        <Pagination
          currentPage={parseInt(searchParams.page)}
          itemsCount={totalIssues}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
