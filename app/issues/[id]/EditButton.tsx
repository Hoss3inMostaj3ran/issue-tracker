import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const EditButton = ({ id }: { id: number }) => {
  return (
    <button className="btn bg-sky-300">
      <Link href={`/issues/${id}/edit`} className="flex gap-2">
        <FaEdit />
        Edit
      </Link>
    </button>
  );
};

export default EditButton;
