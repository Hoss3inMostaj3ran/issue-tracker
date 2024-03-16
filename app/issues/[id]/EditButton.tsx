import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const EditButton = ({ id }: { id: number }) => {
  return (
    <Link href={`/issues/${id}/edit`} className="btn bg-sky-300">
      <FaEdit />
      Edit
    </Link>
  );
};

export default EditButton;
