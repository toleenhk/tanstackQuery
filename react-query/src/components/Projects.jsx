"use client";
import { useState } from "react";
import { useProjects } from "../../services/queries";

export default function Projects() {
  const [page, setPage] = useState(1);

  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useProjects(page);

  return (
    <div>
      {isPending ? (
        <div>loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current page: {page}</span>
      <button
        className="block text-green-700 font-bold"
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
      >
        Previous Page
      </button>{" "}
      <button
        className=" text-red-700 font-bold"
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        Next Page
      </button>
      {isFetching ? <div>Loading...</div> : null}{" "}
    </div>
  );
}
