import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createNewTodo,
  updateTodo,
  updateTodoByIdSix,
  deleteTodo,
} from "./api";

export function useCreateNewTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newTodo) => createNewTodo(newTodo),
    onMutate: () => {
      console.log("it is on mutate");
    },
    onSuccess: () => {
      console.log("it is on success");
    },
    onError: () => {
      console.log("it is on error");
    },
    onSettled: (_, error) => {
      console.log("it is on settled");
      if (error) {
        console.log("there is an error");
      } else {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        queryClient.invalidateQueries({ queryKey: ["todoById"] });
        //instead of refreash the page so we could see the new todo now every time we submit we see new todo
      }
    },
  });
  return mutation;
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => updateTodo(data),
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log("there is an error");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries(["todoById"], { id: variables.id });
        //another way+> await queryClient.invalidateQueries({queryKey:["todoById"]},{id:variables.id});
      }
    },
  });
  return mutation;
}

export function useUpdateTodoByIdSix() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => updateTodoByIdSix(data),
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log("error happened");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries(
          { queryKey: ["todo"] },
          variables.id
        );
      }
    },
  });
  return mutation;
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => {
      console.log("deleted successfully");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
  return mutation;
}
// export function useDeleteTodo(id){

// }

// useMutation({
//     mutationFn: addTodo,
//     onMutate: (variables) => {
//       // A mutation is about to happen!

//       // Optionally return a context containing data to use when for example rolling back
//       return { id: 1 }
//     },
//     onError: (error, variables, context) => {
//       // An error happened!
//       console.log(`rolling back optimistic update with id ${context.id}`)
//     },
//     onSuccess: (data, variables, context) => {
//       // Boom baby!
//     },
//     onSettled: (data, error, variables, context) => {
//       // Error or success... doesn't matter!
//     },
//   })
