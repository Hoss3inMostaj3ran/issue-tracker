import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function page() {
  const closes = await prisma.issue.count({ where: { status: "CLOSE" } });
  const opens = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgresses = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <div className="">
      <IssueChart closes={closes} opens={opens} inProgresses={inProgresses} />
    </div>
  );
}
