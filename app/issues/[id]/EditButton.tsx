import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const EditButton = ({ id }: { id: number }) => {
  return (
    <button>
      <Link href={`/issues/${id}/edit`} className="btn btn-outline">
        <FaEdit />
        Edit
      </Link>
    </button>
  );
};

export default EditButton;
