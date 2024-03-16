import { GeneralLoading } from "@/app/components";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <GeneralLoading />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
