import { useQuery, useQueries, keepPreviousData } from "@tanstack/react-query";
import { getTodosIds, getTodoById, getProjects } from "./api";

export function useTodosIds() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
  });

  return { isLoading, isError, data };
}

export function useTodoById(id) {
  const { data } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id),
    enabled: !!id, // Ensure the query runs only if id is truthy
  });

  return { data };
}

export function useTodosInfo(ids) {
  const queries = ids.map((id) => ({
    queryKey: ["todoById", { id }],
    queryFn: () => getTodoById(id),
  }));

  const results = useQueries({ queries });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const data = results.map((result) => result.data);
  console.log(`data: ${data}`); // here we have arries= the ids, Id=[1,2,3,4], we have 4 arries every array contain objects
  return { data, isLoading, isError };
}

export function useProjects(page) {
  return useQuery({
    queryKey: ["projects", { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  });
}
