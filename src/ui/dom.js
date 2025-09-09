import Todo from "../models/Todo.js";
import TodoList from "../models/TodoList.js";
import ellipsis from "../assets/ellipsis-icon-dark.png";
import close from "../assets/close-icon-dark.png";

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
    renderToDos(todoList.getAll());

    console.log(todoList);

    form.reset();
  });

  // Redo render
  function renderToDos(todos) {
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
      titleContainer.appendChild(todoTitle);

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
        if (
          !menuButton.contains(event.target) &&
          !menu.contains(event.target)
        ) {
          menu.classList.remove("show");
        }
      });
      menuContainer.appendChild(menuButton);

      const menu = document.createElement("div");
      menu.classList.add("menu");
      menuContainer.appendChild(menu);

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
          renderToDos(todos);
        });
        buttonContainer.appendChild(newTitleCancel);

        const newTitleSubmit = document.createElement("button");
        newTitleSubmit.classList.add("edit-actions");
        newTitleSubmit.classList.add("submit");
        newTitleSubmit.textContent = "Submit";
        newTitleSubmit.addEventListener("click", (event) => {
          event.preventDefault();
          if (newTitle.value) {
            todo.title = newTitle.value;
          }
          menuButton.classList.remove("disabled");
          renderToDos(todos);
        });
        buttonContainer.appendChild(newTitleSubmit);
      });
      menu.appendChild(editTitle);

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
          renderToDos(todos);
        });
        buttonContainer.appendChild(newDeadlineCancel);

        const newDeadlineSubmit = document.createElement("button");
        newDeadlineSubmit.classList.add("edit-actions");
        newDeadlineSubmit.classList.add("submit");
        newDeadlineSubmit.textContent = "Submit";
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
          renderToDos(todos);
        });
        buttonContainer.appendChild(newDeadlineSubmit);
      });
      menu.appendChild(editDueDate);

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

      const lowPriority = document.createElement("div");
      lowPriority.classList.add("menu-option");
      lowPriority.textContent = "Low";
      lowPriority.addEventListener("click", () => {
        todo.update({ priority: "low" });
        renderToDos(todos);
      });
      submenu.appendChild(lowPriority);

      const mediumPriority = document.createElement("div");
      mediumPriority.classList.add("menu-option");
      mediumPriority.textContent = "Medium";
      mediumPriority.addEventListener("click", () => {
        todo.update({ priority: "medium" });
        renderToDos(todos);
      });
      submenu.appendChild(mediumPriority);

      const highPriority = document.createElement("div");
      highPriority.classList.add("menu-option");
      highPriority.textContent = "High";
      highPriority.addEventListener("click", () => {
        todo.update({ priority: "high" });
        renderToDos(todos);
      });
      submenu.appendChild(highPriority);

      const deleteTodo = document.createElement("div");
      deleteTodo.classList.add("menu-option");
      deleteTodo.classList.add("danger");
      deleteTodo.textContent = "Delete To-do";
      deleteTodo.addEventListener("click", () => {
        todoList.remove(index);
        renderToDos(todos);
      });
      menu.appendChild(deleteTodo);

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
          renderToDos(todos);
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
          renderToDos(todos);
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
        renderToDos(todos);
      });

      if (todo.completed) {
        toggleButton.classList.add("undo");
      } else {
        toggleButton.classList.add("mark-completed");
      }
      buttonContainer.appendChild(toggleButton);
    });
  }
}
