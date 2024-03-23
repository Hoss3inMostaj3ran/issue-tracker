import Link from "next/link";

const NewIssueBtn = () => {
  return (
    <div>
      <Link className="btn btn-outline btn-md" href="/issues/new">
        New Issue
      </Link>
    </div>
  );
};

export default NewIssueBtn;
