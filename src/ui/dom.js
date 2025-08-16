import Todo from "../models/Todo.js";
import TodoList from "../models/TodoList.js";

const todoList = new TodoList();

export default function initUI() {
  const form = document.querySelector("#todo-form");
  const todoContainer = document.querySelector("#todo-container");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;

    const newTodo = new Todo(title, dueDate, priority);
    todoList.add(newTodo);
    renderToDos(todoList.getAll());

    form.reset();
  });

  function renderToDos(todos) {
    todoContainer.innerHTML = "";
    todos.forEach((todo, index) => {
      const todoCard = document.createElement("div");
      todoCard.textContent = `${todo.title} - Due: ${todo.dueDate} - Priority: ${todo.priority}`;

      const toggleButton = document.createElement("button");
      toggleButton.textContent = todo.completed ? "Undo" : "Completed";
      toggleButton.addEventListener("click", () => {
        todo.toggleComplete();
        console.log(todo.completed);
        renderToDos(todos);
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        todoList.remove(index);
        renderToDos(todos);
      });

      todoCard.appendChild(toggleButton);
      todoCard.appendChild(deleteButton);
      todoContainer.appendChild(todoCard);
    });
  }
}
