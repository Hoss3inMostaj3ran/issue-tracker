"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { lable: string; status: Status }[] = [
  { lable: "All", status: "UNDEFINED" },
  { lable: "Close", status: "CLOSE" },
  { lable: "Open", status: "OPEN" },
  { lable: "In-Progress", status: "IN_PROGRESS" },
];

type Props = {};

const IssueFilter = (props: Props) => {
  const router = useRouter();

  return (
    <div>
      <Select.Root
        size="3"
        onValueChange={(status) => {
          const query = status !== "UNDEFINED" ? `?status=${status}` : "";
          router.push(`/issues/${query}`);
        }}
      >
        <Select.Trigger variant="surface" placeholder="Filter by status..." />
        <Select.Content>
          {statuses.map((stat) => (
            <Select.Item
              key={stat.status}
              value={stat.status}
              disabled={!stat.status}
            >
              {stat.lable}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default IssueFilter;
