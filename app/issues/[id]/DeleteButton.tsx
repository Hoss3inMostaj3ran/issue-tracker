"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

const DeleteButton = ({ id }: { id: number }) => {
  return (
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
            <Button variant="solid" color="red">
              Yes, Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButton;
