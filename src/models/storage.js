import Todo from "./Todo.js";

const Storage = (() => {
  const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos.map((obj) => rehydrateTodo(obj));
  };

  const rehydrateTodo = (obj) => {
    const todo = new Todo(obj.title, obj.dueDate, obj.priority);
    todo.completed = obj.completed;
    return todo;
  };

  return { saveTodos, getTodos };
})();

export default Storage;
