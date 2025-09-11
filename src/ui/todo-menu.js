import { todoSubmenu } from "./todo-submenu.js";
import ellipsis from "../assets/ellipsis-icon-dark.png";

export function todoMenu(
  titleSection,
  titleContainer,
  buttonContainer,
  deadlineContainer,
  todo,
  todos,
  todoList,
  index,
  renderTodos
) {
  const menuContainer = document.createElement("div");
  menuContainer.classList.add("menu-container");
  titleSection.appendChild(menuContainer);

  const menuButton = document.createElement("img");
  menuButton.classList.add("menu-button");
  menuButton.src = ellipsis;
  menuButton.alt = "More Options";
  menuButton.addEventListener("click", () => {
    if (menuButton.classList.contains("disabled")) {
      return;
    }
    menu.classList.toggle("show");
  });
  window.addEventListener("click", (event) => {
    if (!menuButton.contains(event.target) && !menu.contains(event.target)) {
      menu.classList.remove("show");
    }
  });
  menuContainer.appendChild(menuButton);
  const menu = document.createElement("div");
  menu.classList.add("menu");
  menuContainer.appendChild(menu);

  // Allows the user to edit the current todo item's title
  const editTitle = document.createElement("div");
  editTitle.classList.add("menu-option");
  editTitle.textContent = "Edit Title";
  editTitle.addEventListener("click", () => {
    menuButton.classList.add("disabled");
    titleContainer.innerHTML = "";
    buttonContainer.innerHTML = "";
    menu.classList.remove("show");

    const newTitle = document.createElement("input");
    newTitle.classList.add(`${todo.priority}`);
    newTitle.id = "new-title";
    newTitle.type = "text";
    titleContainer.appendChild(newTitle);
    newTitle.focus();

    const newTitleCancel = document.createElement("button");
    newTitleCancel.classList.add("edit-actions");
    newTitleCancel.classList.add("cancel");
    newTitleCancel.textContent = "Cancel";
    newTitleCancel.addEventListener("click", (event) => {
      event.preventDefault();
      menuButton.classList.remove("disabled");
      renderTodos(todos);
    });
    buttonContainer.appendChild(newTitleCancel);

    const newTitleSubmit = document.createElement("button");
    newTitleSubmit.classList.add("edit-actions");
    newTitleSubmit.classList.add("submit");
    newTitleSubmit.textContent = "Save Changes";
    newTitleSubmit.addEventListener("click", (event) => {
      event.preventDefault();
      if (newTitle.value) {
        todo.title = newTitle.value;
      }
      menuButton.classList.remove("disabled");
      renderTodos(todos);
    });
    buttonContainer.appendChild(newTitleSubmit);
  });
  menu.appendChild(editTitle);

  // Allows the user to edit the current todo's date/time deadline
  const editDueDate = document.createElement("div");
  editDueDate.classList.add("menu-option");
  editDueDate.textContent = "Change Deadline";
  editDueDate.addEventListener("click", () => {
    menuButton.classList.add("disabled");
    deadlineContainer.innerHTML = "";
    buttonContainer.innerHTML = "";
    menu.classList.remove("show");

    const newDate = document.createElement("input");
    newDate.id = "new-date";
    newDate.type = "date";
    deadlineContainer.appendChild(newDate);
    newDate.focus();

    const newTime = document.createElement("input");
    newTime.id = "new-time";
    newTime.type = "time";
    deadlineContainer.appendChild(newTime);

    const newDeadlineCancel = document.createElement("button");
    newDeadlineCancel.classList.add("edit-actions");
    newDeadlineCancel.classList.add("cancel");
    newDeadlineCancel.textContent = "Cancel";
    newDeadlineCancel.addEventListener("click", (event) => {
      event.preventDefault();
      menuButton.classList.remove("disabled");
      renderTodos(todos);
    });
    buttonContainer.appendChild(newDeadlineCancel);

    const newDeadlineSubmit = document.createElement("button");
    newDeadlineSubmit.classList.add("edit-actions");
    newDeadlineSubmit.classList.add("submit");
    newDeadlineSubmit.textContent = "Save Changes";
    newDeadlineSubmit.addEventListener("click", (event) => {
      event.preventDefault();
      if (newDate.value) {
        todo.dueDate = newDate.value;
        const deadlineDate = document.createElement("p");
        deadlineDate.classList.add("deadline");
        const [year, month, day] = todo.dueDate.split("-");
        const formattedDate = `${parseInt(month)}/${parseInt(day)}/${year}`;
        deadlineDate.textContent = `${formattedDate}`;
        deadlineContainer.appendChild(deadlineDate);
      }

      if (newTime.value) {
        todo.dueTime = newTime.value;
        const deadlineTime = document.createElement("p");
        deadlineTime.classList.add("deadline");
        let [hour, minute] = todo.dueTime.split(":");
        hour = parseInt(hour);
        const amPm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        const formattedTime = `${hour}:${minute} ${amPm}`;
        deadlineTime.textContent = `${formattedTime}`;
        deadlineContainer.appendChild(deadlineTime);
      }

      if (!todo.dueDate && !todo.dueTime) {
        const noDeadline = document.createElement("p");
        noDeadline.classList.add("deadline");
        noDeadline.textContent = "No Deadline";
        deadlineContainer.appendChild(noDeadline);
      }
      menuButton.classList.remove("disabled");
      renderTodos(todos);
    });
    buttonContainer.appendChild(newDeadlineSubmit);
  });
  menu.appendChild(editDueDate);

  // Allows the user to edit the priority level of the current todo item
  const editPriority = document.createElement("div");
  editPriority.classList.add("menu-option");
  editPriority.textContent = "Change Priority";
  editPriority.addEventListener("click", () => {
    submenu.classList.toggle("show");
  });
  menu.appendChild(editPriority);

  const submenu = document.createElement("div");
  submenu.classList.add("submenu");
  editPriority.appendChild(submenu);

  // Deletes the current todo item
  const deleteTodo = document.createElement("div");
  deleteTodo.classList.add("menu-option");
  deleteTodo.classList.add("danger");
  deleteTodo.textContent = "Delete To-do";
  deleteTodo.addEventListener("click", () => {
    todoList.remove(index);
    renderTodos(todoList.getAll(), todoList);
  });
  menu.appendChild(deleteTodo);

  todoSubmenu(submenu, todo, todos, renderTodos);
}
