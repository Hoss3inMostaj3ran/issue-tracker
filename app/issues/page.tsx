import Link from "next/link";
import Issues from "./Issues";

const page = () => {
  return (
    <div className="p-5">
      <Issues />
      <br />
      <Link className="btn btn-outline" href="/issues/new">
        New Issue
      </Link>
    </div>
  );
};

export default page;
