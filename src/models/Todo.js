// title, description, dueDate and priority. You might also want to include notes or even a checklist
export default class Todo {
  constructor(title, description, dueDate, priority = "normal", notes) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.completed = false;
  }

  markComplete() {
    this.completed = true;
  }

  markIncomplete() {
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  update(title, description, dueDate, priority, notes) {
    if (title) {
      this.title = title;
    }
    if (description) {
      this.description = description;
    }
    if (dueDate) {
      this.dueDate = dueDate;
    }
    if (priority) {
      this.priority = priority;
    }
    if (notes) {
      this.notes = notes;
    }
  }
}
