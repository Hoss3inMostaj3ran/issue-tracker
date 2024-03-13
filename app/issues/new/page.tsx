"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/createIssueSchema";
import { z } from "zod";
import TextError from "@/app/components/TextError";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;
// interface IssueForm {
//   title: string;
//   description: string;
// }

const NewIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  return (
    <>
      <h1 className="text-2xl mt-5 pt-2 mx-5">What is your Issue? </h1>

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setLoader(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setLoader(false);
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
          {errors.title && <TextError error={errors.title.message!} />}
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
          {errors.description && (
            <TextError error={errors.description.message!} />
          )}
        </div>

        {error && <TextError error={error} />}
        <button
          className="btn bg-gray-300 hover:bg-gray-400 mt-5"
          type="submit"
        >
          Submit Issue
          {loader && <Spinner />}
        </button>
      </form>
    </>
  );
};

export default NewIssue;
