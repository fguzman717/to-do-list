// Core Functionality

// 1. Task Creation and Description:
//         - Users should be able to easily create new tasks and provide details, including descriptions, context, and any relevant notes.

// 2. Due Dates and Reminders:
//         - The ability to set due dates and reminders for tasks to ensure timely completion.

// 3. Prioritization:
//         - Features to flag important tasks and organize them by priority.

// 4. Categories/Folders:
//         - Ability to group related tasks into categories or folders for better organization.

// 5. Tags:
//         - Using tags or labels to identify and filter tasks.

// 6. Sub-tasks:
//         - Breaking down larger tasks into smaller, manageable sub-tasks.

// 7. Progress Tracking:
//         - Features to monitor task progress, such as progress bars or completion percentages.

// Get References to DOM elements
// Listen for form submission
// Add task to list
// Create HTML for new task item
// Handle task completion
// Handle task deletion

// Basic form for list input
const app = document.querySelector(".app");

const form = document.createElement("form");
form.id = "to-do-form-";
form.setAttribute("action", "");
app.appendChild(form);

const formInput = document.createElement("input");
formInput.id = "to-do-input";
formInput.type = "text";
formInput.placeholder = "Enter Your Tasks";
formInput.required = true;
form.appendChild(formInput);

const formButton = document.createElement("button");
formButton.type = "submit";
formButton.textContent = "Add";
form.appendChild(formButton);

const list = document.createElement("ul");
list.className = "to-do-list";
app.appendChild(list);

// Event listener when the user enters a new list item
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputText = formInput.value.trim();

  if (inputText === "") {
    return;
  }
  const listItem = document.createElement("li");
  listItem.className = "list-item-container";
  // listItem.textContent = inputText;

  const item = document.createElement("div");
  item.className = "item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";

  const task = document.createElement("label");
  task.className = "task";
  task.for = "checkbox";
  task.textContent = inputText;

  // A delete button will be added with the list item
  const deleteItem = document.createElement("button");
  deleteItem.className = "delete-button";
  deleteItem.textContent = "x";
  deleteItem.addEventListener("click", () => {
    listItem.remove();
  });

  list.appendChild(listItem);
  listItem.appendChild(item);
  item.append(checkbox, task);
  listItem.appendChild(deleteItem);
  formInput.value = "";
});
