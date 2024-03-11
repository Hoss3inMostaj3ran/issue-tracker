import Link from "next/link";
import React from "react";

const Issues = () => {
  return (
    <div className="p-5">
      Issues
      <br />
      <Link className="btn btn-outline" href="/issues/new">
        New Issue
      </Link>
    </div>
  );
};

export default Issues;
