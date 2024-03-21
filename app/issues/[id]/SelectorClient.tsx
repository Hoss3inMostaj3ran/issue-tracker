"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";

const SelectorClient = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((resp) => resp.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton height="40px" />;
  if (error) console.log(error);

  const checkId = (id: null | "unassigned" | string) => {
    if (id === "unassigned") return null;
    else if (id !== null) return id;
    else return null;
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.userId || "unassigned"}
        size={"3"}
        onValueChange={async (id) => {
          try {
            await axios.patch(`/api/issues/${issue.id}`, {
              userId: checkId(id),
            });
          } catch (error) {
            toast.error("Change could not be saved");
          }
        }}
      >
        <Select.Trigger
          className="select select-primary select-bordered border-2 w-full max-w-xs"
          radius="none"
          placeholder="Assign user..."
        />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((u) => (
              <Select.Item key={u.id} value={u.id}>
                {u.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default SelectorClient;
// className="select select-secondary select-bordered border-2 w-full max-w-xs"
