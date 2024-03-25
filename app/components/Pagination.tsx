"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";

type Props = {
  pageSize: number;
  currentPage: number;
  itemsCount: number;
};

const Pagination = ({ pageSize, currentPage = 1, itemsCount }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const totalPages = Math.ceil(itemsCount / pageSize);
  if (totalPages <= 1) return null;
  if (!currentPage) currentPage = 1;

  const changePage = (page: number) => {
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="join flex">
      <button
        className="join-item btn "
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
      >
        <LuChevronFirst />
      </button>

      <button
        className="join-item btn "
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <GrFormPrevious />
      </button>

      <button className="join-item btn cursor-default">
        <label className="label-text">
          Page {currentPage} of {totalPages}
        </label>
      </button>

      <button
        className="join-item btn"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <GrFormNext />
      </button>

      <button
        className="join-item btn"
        onClick={() => changePage(totalPages)}
        disabled={currentPage === totalPages}
      >
        <LuChevronLast />
      </button>
    </div>
  );
};

export default Pagination;
