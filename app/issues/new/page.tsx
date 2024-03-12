"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  return (
    <>
      <h1 className="text-2xl mt-5 pt-2 mx-5">What is your Issue? </h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          await axios.post("/api/issues", data);
          router.push("/issues");
          console.log("success");
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
