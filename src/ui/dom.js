import Todo from "../models/Todo.js";
import TodoList from "../models/TodoList.js";
import { renderTodos } from "./render-todos.js";

const todoList = new TodoList();

export default function initUI() {
  const form = document.querySelector("#todo-form");
  const todoContainer = document.querySelector("#todo-container");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = document.querySelector("#title").value;
    let dueDate = document.querySelector("#dueDate").value;
    let dueTime = document.querySelector("#dueTime").value;
    let priority = document.querySelector("#priority").value;
    let description = document.querySelector("#description").value;

    if (!title) {
      title = "Untitled To-Do";
    }
    if (!dueDate && !dueTime) {
      dueDate = "";
      dueTime = "";
    }
    if (description) {
      description = "No Description";
    }

    const newTodo = new Todo(title, dueDate, dueTime, priority, description);
    todoList.add(newTodo);

    const todos = todoList.getAll();
    renderTodos(todos, todoList);

    form.reset();
  });
}
