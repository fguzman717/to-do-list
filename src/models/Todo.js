export default class Todo {
  constructor(title, dueDate, dueTime, priority = "low", description) {
    this.title = title;
    this.dueDate = dueDate;
    this.dueTime = dueTime;
    this.priority = priority;
    this.description = description;
    this.checklist = [];
    this.inProgress = false;
    this.completed = false;
  }

  markComplete() {
    this.completed = true;
  }

  markIncomplete() {
    this.completed = false;
  }

  toggleInProgress() {
    this.inProgress = !this.inProgress;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  addToChecklist(item) {
    this.checklist.push(item);
  }

  removeFromChecklist(index) {
    this.checklist.splice(index, 1);
  }

  update({ title, dueDate, priority, description }) {
    if (title) {
      this.title = title;
    }
    if (dueDate) {
      this.dueDate = dueDate;
    }
    if (priority) {
      this.priority = priority;
    }

    if (description) {
      this.description = description;
    }
  }

  updatePriority(newPriority) {
    if (newPriority) {
      this.priority = newPriority;
    }
  }
}
