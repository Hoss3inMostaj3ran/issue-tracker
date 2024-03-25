import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { LuArrowUpWideNarrow } from "react-icons/lu";
import StatusBadge from "../../components/StatusBadge";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
};

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {tableColumns.map((col) => (
            <Table.ColumnHeaderCell key={col.value}>
              <Link href={{ query: { ...searchParams, orderBy: col.value } }}>
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
  );
};

export const tableColumns: {
  lable: string;
  value: keyof Issue;
}[] = [
  { lable: "Issue", value: "title" },
  { lable: "Status", value: "status" },
  { lable: "Created", value: "createdAt" },
];

export default IssueTable;
