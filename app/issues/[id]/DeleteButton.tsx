import Link from "next/link";
import { FaTrash } from "react-icons/fa";

const DeleteButton = ({ id }: { id: number }) => {
  return (
    <Link href={`/issues/${id}/delete`} className="btn bg-error">
      <FaTrash />
      Delete
    </Link>
  );
};

export default DeleteButton;
