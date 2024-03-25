import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";

type Props = {
  pageSize: number;
  currentPage: number;
  itemsCount: number;
};

const Pagination = ({ pageSize, currentPage, itemsCount }: Props) => {
  const totalPages = Math.ceil(itemsCount / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="join flex">
      <button className="join-item btn " disabled={currentPage === 1}>
        <LuChevronFirst />
      </button>

      <button className="join-item btn " disabled={currentPage === 1}>
        <GrFormPrevious />
      </button>

      <button className="join-item btn cursor-default">
        <label className="label-text">
          Page {currentPage} of {totalPages}
        </label>
      </button>

      <button className="join-item btn" disabled={currentPage === totalPages}>
        <GrFormNext />
      </button>

      <button className="join-item btn" disabled={currentPage === totalPages}>
        <LuChevronLast />
      </button>
    </div>
  );
};

export default Pagination;
