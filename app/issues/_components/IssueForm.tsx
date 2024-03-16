"use client";
import { Spinner, TextError } from "@/app/components";
import { issueSchema } from "@/app/issueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoader(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
      } else {
        setError("An unknown error occurred.");
      }
      setLoader(false);
    }
  });

  return (
    <>
      <h1 className="text-2xl mt-5 pt-2 mx-5">What is your Issue? </h1>

      <form onSubmit={onSubmit} className="p-5">
        <div className="flex flex-col gap-4">
          <input
            {...register("title")}
            type="text"
            placeholder="Enter Title"
            className="input input-bordered  w-full max-w-3xl"
            value={issue?.title}
          />
          {errors.title && <TextError error={errors.title.message!} />}
          <Controller
            name="description"
            defaultValue={issue?.description}
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
          disabled={loader}
        >
          Submit Issue
          {loader && <Spinner />}
        </button>
      </form>
    </>
  );
};

export default IssueForm;
