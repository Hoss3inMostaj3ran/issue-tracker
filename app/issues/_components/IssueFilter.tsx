"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return (
    <div>
      <Select.Root
        size="3"
        defaultValue={searchParams.get("status") || ""}
        onValueChange={(status) => {
          const orderBy = searchParams.get("orderBy");
          if (orderBy) params.append("orderBy", orderBy);

          if (status !== "UNDEFINED") {
            params.set("status", status);
          } else {
            params.delete("status");
          }
          // status !== "UNDEFINED" ? params.append("status", status) : undefined;

          const query = params.toString() ? `?${params.toString()}` : "";
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
