"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <>
      <h1 className="text-2xl mt-5 pt-2 mx-5">What is your Issue? </h1>

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError(error.message);
          }
        })}
        className="p-5"
      >
        <div className="flex flex-col gap-4">
          <input
            {...register("title")}
            type="text"
            placeholder="Enter Title"
            className="input input-bordered  w-full max-w-3xl"
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                {...field}
                placeholder="Enter Description"
                className="w-full h-15 max-w-3xl"
              />
            )}
          />
        </div>

        {error && (
          <div className=" w-full max-w-3xl">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
        <button
          className="btn bg-gray-300 hover:bg-gray-400 mt-5"
          type="submit"
        >
          Submit Issue
        </button>
      </form>
    </>
  );
};

export default NewIssue;
