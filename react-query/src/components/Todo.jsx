import React, { useState } from "react";
import { useTodoById, useTodosIds, useTodosInfo } from "../../services/queries";
import {
  useCreateNewTodo,
  useDeleteTodo,
  useUpdateTodo,
  useUpdateTodoByIdSix,
} from "../../services/mutation";

const Todo = () => {
  const todosIdsQuery = useTodosIds();
  const ids = todosIdsQuery.data || [];
  const oneTodo = useTodoById(7);
  const todosInfo = useTodosInfo(ids);
  const createNewTodoMutation = useCreateNewTodo(); // Initialize the create new todo mutation
  const updateTodo = useUpdateTodo();
  const updateTodoByIdSix = useUpdateTodoByIdSix();
  const deleteTodo = useDeleteTodo();

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    checked: false,
  });
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo.mutateAsync(id);
      console.log("success");
    } catch (error) {
      console.error("todo:", error);
    }
  };
  const handleNewTodoSubmit = (e) => {
    e.preventDefault();
    createNewTodoMutation.mutate(newTodo); // Trigger the mutation with the new todo data
    setNewTodo({ title: "", description: "", checked: false }); // Reset the form after submission
  };
  const handleUpdateNewTodo = (data) => {
    updateTodo.mutate({ ...data, checked: true });
  };

  const handleUpdateTodoByIdSix = (data) => {
    updateTodoByIdSix.mutate({ ...data, title: "new2 title for id 6" });
  };

  if (todosIdsQuery.isLoading) {
    return <div>Loading...</div>; // Display loading spinner or animation instead of plain text
  }

  if (todosIdsQuery.isError) {
    return <div>Failed to fetch todo items</div>; // Notify user about the error
  }

  return (
    <div>
      <div>
        <h3 className="text-red-700 font-bold">All Todos Id</h3>
        {todosIdsQuery?.data?.length > 0 ? (
          <ul>
            {todosIdsQuery.data.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        ) : (
          <div>No todos found</div> // Display appropriate message if no todos are available
        )}
      </div>
      <div>
        <h3 className="text-red-700 font-bold pt-5">Todo id:6 details</h3>
        {oneTodo.data ? (
          <div>
            <h3>Todo Details:</h3>
            <p>ID: {oneTodo.data.id}</p>
            <p>Title: {oneTodo.data.title}</p>
            <p>Description: {oneTodo.data.description}</p>
            <p>Checked: {oneTodo.data.checked ? "Yes" : "No"}</p>
            <div>
              <button onClick={() => handleUpdateTodoByIdSix(oneTodo.data)}>
                change title
              </button>
            </div>
          </div>
        ) : (
          <div>No todo found</div> // Display appropriate message if no todo is available
        )}
      </div>
      <div>
        <h3 className="text-red-700 font-bold pt-5">
          All the Todos Informations
        </h3>
        {todosInfo.isLoading ? (
          <div>Loading...</div>
        ) : todosInfo.isError ? (
          <div>Failed to fetch todos info</div>
        ) : todosInfo.data?.length > 0 ? (
          todosInfo.data.map((todo) => (
            <div key={todo?.id}>
              <p>ID: {todo?.id}</p>
              <p>Title: {todo?.title}</p>
              <p>Description: {todo?.description}</p>
              <div>
                <button
                  className="text-green-600 font-bold text-xl"
                  onClick={() => handleUpdateNewTodo(todo)}
                  // disabled={(todo.checked = true)} not right, do not use
                  disabled={todo?.checked}
                >
                  {todo?.checked ? "done" : "make check true"}
                </button>
                {todo && (
                  <button
                    className="text-red-600 font-bold text-xl block"
                    onClick={() => handleDeleteTodo(todo.id)}
                    // disabled={(todo.checked = true)} not right, do not use
                  >
                    Delete
                  </button>
                )}
                -------
              </div>
            </div>
          ))
        ) : (
          <div>No todos info found</div>
        )}
      </div>
      <div>
        <h3 className="text-red-700 font-bold pt-5">Add new Todo</h3>
        <form onSubmit={handleNewTodoSubmit}>
          <input
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            // ...newTodo, will create a new object with the same description and checked properties from newTodo,
            placeholder="Title"
          />
          <input
            type="text"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            placeholder="Description"
          />
          <button type="submit" disabled={createNewTodoMutation.isPending}>
            {createNewTodoMutation.isPending ? "Creating..." : "Create Todo"}
          </button>
          {/* if you want to preent from submitting add to button disabled={!newTodo.title || !newTodo.description} */}
        </form>
      </div>
    </div>
  );
};

export default Todo;
