"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleClick = (filter) => {
    const params = new URLSearchParams();
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scrole: false });
  };

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleClick}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleClick}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleClick}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleClick}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
};

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}
