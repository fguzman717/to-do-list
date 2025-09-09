import Storage from "./storage.js";

export default class TodoList {
  constructor(listTitle) {
    this.listTitle = listTitle;
    this.todoList = [];
    this.inProgress = [];
    this.completed = [];
    this.favorite = false;
  }

  add(todo) {
    this.todoList.push(todo);
  }

  remove(index) {
    this.todoList.splice(index, 1);
    Storage.saveTodos(this.todoList);
  }

  getAll() {
    return this.todoList;
  }

  getInProgress() {
    return this.inProgress.filter((todo) => todo.inProgress);
  }

  addToInProgress() {
    this.inProgress.push(getInProgress());
  }

  getIncomplete() {
    return this.todoList.filter((todo) => !todo.completed);
  }

  getCompleted() {
    return this.todoList.filter((todo) => todo.completed);
  }

  addToCompleted() {
    this.completed.push(getCompleted());
  }
}
