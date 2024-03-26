"use client";

import { Card } from "@radix-ui/themes";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type Props = {
  opens: number;
  closes: number;
  inProgresses: number;
};

const IssueChart = ({ closes, inProgresses, opens }: Props) => {
  const data = [
    { lable: "Open", value: opens },
    { lable: "In Progress", value: inProgresses },
    { lable: "Close", value: closes },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="lable" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Bar
            type="monotone"
            dataKey="value"
            barSize={45}
            fill="#abcdef"
            stroke="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
