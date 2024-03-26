import prisma from "@/prisma/client";
import IssuesCount from "./IssuesCount";
import LatestIssues from "./LatestIssues";

export default async function page() {
  const closes = await prisma.issue.count({ where: { status: "CLOSE" } });
  const opens = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgresses = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <div className="">
      <IssuesCount closes={closes} opens={opens} inProgresses={inProgresses} />
    </div>
  );
}
