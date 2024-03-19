"use client";

import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const SelectorClient = () => {
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

  return (
    <select
      title="Test"
      className="select select-accent select-bordered w-full max-w-xs"
    >
      <option disabled selected>
        List of users
      </option>
      {error && (
        <option disabled className="text-red-600">
          There is Problem in Fetch Data
        </option>
      )}
      {users?.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
};

export default SelectorClient;
