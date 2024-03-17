"use client";
import { TextError } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete("/api/issues/" + id);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("The Unknown error is occured!");
    }
  };

  return (
    <>
      {error && <TextError error={error} />}
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Link href={`/issues/${id}`} className="btn bg-error">
            <FaTrash />
            Delete
          </Link>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure to delete issue? This application will no longer be
            accessible and any existing sessions will be expired.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                No, Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={handleDelete} variant="solid" color="red">
                Yes, Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
