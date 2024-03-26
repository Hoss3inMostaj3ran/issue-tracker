import { Status } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import StatusBadge from "../components/StatusBadge";

type Props = {
  opens: number;
  closes: number;
  inProgresses: number;
};

const IssuesCount = ({ opens, closes, inProgresses }: Props) => {
  const issuesSummery: {
    lable: string;
    value: number;
    status: Status;
  }[] = [
    { lable: "Open Issues", value: opens, status: "OPEN" },
    { lable: "In-Progress Issues", value: inProgresses, status: "IN_PROGRESS" },
    { lable: "Closed Issues", value: closes, status: "CLOSE" },
  ];

  return (
    <div className="p-2">
      <div className="flex flex-col gap-4 md:flex-row">
        {issuesSummery.map((i) => (
          <Flex
            key={i.value}
            direction={"column"}
            gap={"2"}
            className="border-2  rounded-xl border-slate-400 w-full hover:border-gray-600"
          >
            <div className="mx-2 my-2 p-2">
              <Flex direction={"row"} align={"center"} justify={"between"}>
                <h3 className="font-semibold text-lg tracking-wider">
                  <Link href={`/issues?status=${i.status}`}>{i.lable}</Link>
                </h3>
                <StatusBadge status={i.status} />
              </Flex>

              <Text className="font-bold font-serif text-3xl">{i.value}</Text>
            </div>
          </Flex>
        ))}
      </div>
    </div>
  );
};

export default IssuesCount;
