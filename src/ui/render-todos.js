import { todoMenu } from "./todo-menu.js";
import { expandTodo } from "./expanded-todo.js";
import close from "../assets/close-icon-dark.png";

export function renderTodos(todos, todoList) {
  const todoContainer = document.querySelector("#todo-container");
  todoContainer.innerHTML = "";
  todos.forEach((todo, index) => {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");
    todoContainer.appendChild(todoCard);

    const titleSection = document.createElement("div");
    titleSection.classList.add("title-section");
    todoCard.appendChild(titleSection);

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title-container");
    titleSection.appendChild(titleContainer);

    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todo-title");
    todoTitle.classList.add(`${todo.priority}`);
    todoTitle.textContent = `${todo.title}`;
    todoTitle.addEventListener("click", () => {
      expandTodo(index);
    });
    titleContainer.appendChild(todoTitle);

    const contentSection = document.createElement("div");
    contentSection.classList.add("content-section");
    todoCard.appendChild(contentSection);

    const deadlineContainer = document.createElement("div");
    deadlineContainer.classList.add("deadline-container");
    contentSection.appendChild(deadlineContainer);

    if (todo.dueDate) {
      const deadlineDate = document.createElement("p");
      deadlineDate.classList.add("deadline");
      deadlineDate.id = "date";
      const [year, month, day] = todo.dueDate.split("-");
      const formattedDate = `${parseInt(month)}/${parseInt(day)}/${year}`;
      deadlineDate.textContent = `${formattedDate}`;
      deadlineContainer.appendChild(deadlineDate);

      const removeDate = document.createElement("img");
      removeDate.classList.add("close-button");
      removeDate.src = close;
      removeDate.alt = "Remove Date";
      removeDate.addEventListener("click", () => {
        todo.dueDate = "";
        const dateElement = document.querySelector("#date");
        dateElement.remove();
        renderTodos(todos);
      });
      deadlineDate.appendChild(removeDate);
    }

    if (todo.dueTime) {
      const deadlineTime = document.createElement("p");
      deadlineTime.classList.add("deadline");
      deadlineTime.id = "time";
      let [hour, minute] = todo.dueTime.split(":");
      hour = parseInt(hour);
      const amPm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12;
      const formattedTime = `${hour}:${minute} ${amPm}`;
      deadlineTime.textContent = `${formattedTime}`;
      deadlineContainer.appendChild(deadlineTime);

      const removeTime = document.createElement("img");
      removeTime.classList.add("close-button");
      removeTime.src = close;
      removeTime.alt = "Remove Date";
      removeTime.addEventListener("click", () => {
        todo.dueTime = "";
        const timeElement = document.querySelector("#time");
        timeElement.remove();
        renderTodos(todos);
      });
      deadlineTime.appendChild(removeTime);
    }

    if (!todo.dueDate && !todo.dueTime) {
      const noDeadline = document.createElement("p");
      noDeadline.classList.add("deadline");
      noDeadline.id = "none";
      noDeadline.textContent = "No Deadline";
      deadlineContainer.appendChild(noDeadline);
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    contentSection.appendChild(buttonContainer);

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("todo-actions");
    toggleButton.textContent = todo.completed ? "Undo" : "Completed";
    toggleButton.addEventListener("click", () => {
      todo.toggleComplete();
      renderTodos(todos);
    });

    if (todo.completed) {
      toggleButton.classList.add("undo");
    } else {
      toggleButton.classList.add("mark-completed");
    }
    buttonContainer.appendChild(toggleButton);

    // Adds a menu button to the title container that allows the user to edit and delete todos
    todoMenu(
      titleSection,
      titleContainer,
      buttonContainer,
      deadlineContainer,
      todo,
      todos,
      todoList,
      index,
      renderTodos
    );
  });
}
