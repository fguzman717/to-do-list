export function todoSubmenu(submenu, todo, todos, renderTodos) {
  const lowPriority = document.createElement("div");
  lowPriority.classList.add("menu-option");
  lowPriority.textContent = "Low";
  lowPriority.addEventListener("click", () => {
    todo.update({ priority: "low" });
    renderTodos(todos);
  });
  submenu.appendChild(lowPriority);

  const mediumPriority = document.createElement("div");
  mediumPriority.classList.add("menu-option");
  mediumPriority.textContent = "Medium";
  mediumPriority.addEventListener("click", () => {
    todo.update({ priority: "medium" });
    renderTodos(todos);
  });
  submenu.appendChild(mediumPriority);

  const highPriority = document.createElement("div");
  highPriority.classList.add("menu-option");
  highPriority.textContent = "High";
  highPriority.addEventListener("click", () => {
    todo.update({ priority: "high" });
    renderTodos(todos);
  });
  submenu.appendChild(highPriority);
}
