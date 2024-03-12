"use client";
import React, { useCallback, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  const [value, setValue] = useState(""); // State to store Markdown content

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <form className="p-5">
      <h1 className="text-2xl my-5">What is your Issue? </h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Title"
          className="input input-bordered  w-full max-w-3xl"
        />
        <SimpleMDE
          placeholder="Enter Description"
          className="w-full h-15 max-w-3xl"
          value={value}
          onChange={onChange}
        />
      </div>
      <button className="btn bg-gray-300 hover:bg-gray-400 mt-5" type="submit">
        Submit Issue
      </button>
    </form>
  );
};

export default NewIssue;
