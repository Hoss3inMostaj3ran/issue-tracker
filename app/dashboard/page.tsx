import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import IssuesCount from "./IssuesCount";
import LatestIssues from "./LatestIssues";

export default async function page() {
  const closes = await prisma.issue.count({ where: { status: "CLOSE" } });
  const opens = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgresses = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <div className="p-2">
      <IssuesCount opens={opens} closes={closes} inProgresses={inProgresses} />
      <div className="flex flex-col w-full my-5">
        <div className="divider divider-primary font-semibold text-2xl">
          Status Informations
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 mt-5 w-full">
        <IssueChart opens={opens} closes={closes} inProgresses={inProgresses} />
        <LatestIssues />
      </div>
    </div>
  );
}
