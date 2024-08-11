import axios from "axios";

const BASE_URL = "http://localhost:8080/";
const axiosInstance = axios.create({ baseURL: BASE_URL });

const getTodosIds = async () => {
  const response = await axiosInstance.get("todos");
  return response.data.map((todo) => todo.id);
};

const getTodoById = async (id) => {
  const response = await axiosInstance.get(`todos/${id}`);
  return response.data;
};

const createNewTodo = async (todo) => {
  const response = await axiosInstance.post("todos", todo);
  return response;
};
// const getTodosinfo = async (id) => {
//   const response = await axiosInstance.get(`todos/${id}`);
//   return response.data;
// };

const updateTodo = async (data) => {
  const response = await axiosInstance.put(`todos/${data.id}`, data);
  return response;
};

const updateTodoByIdSix = async (data) => {
  const response = await axiosInstance.put(`todos/${data.id}`, data);
  return response;
};

const deleteTodo = async (id) => {
  const response = await axiosInstance.delete(`todos/${id}`);
  return response;
};

const Todo = {
  checked: Boolean,
  title: String,
  description: String,
  id: Number,
};

const getProjects = async (page) => {
  return (await axiosInstance.get(`projects?_page=${page}&_limit=3`)).data;
};

module.exports = {
  Todo,
  getTodosIds,
  getTodoById,
  createNewTodo,
  updateTodo,
  updateTodoByIdSix,
  deleteTodo,
  getProjects,
};
