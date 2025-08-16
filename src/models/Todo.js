// title, description, dueDate and priority. You might also want to include notes or even a checklist
export default class Todo {
  constructor(title, dueDate, priority = "normal") {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
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

  update({ title, dueDate, priority }) {
    if (title) {
      this.title = title;
    }
    if (dueDate) {
      this.dueDate = dueDate;
    }
    if (priority) {
      this.priority = priority;
    }
  }
}
