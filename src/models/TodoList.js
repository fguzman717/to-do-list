import Storage from "./storage.js";

export default class TodoList {
  constructor(listTitle) {
    this.listTitle = listTitle;
    this.todoList = Storage.getTodos();
  }

  add(todo) {
    this.todoList.push(todo);
    Storage.saveTodos(this.todoList);
  }

  remove(index) {
    this.todoList.splice(index, 1);
    Storage.saveTodos(this.todoList);
  }

  getAll() {
    return this.todoList;
  }

  getIncomplete() {
    return this.todoList.filter((todo) => !todo.completed);
  }

  getCompleted() {
    return this.todoList.filter((todo) => todo.completed);
  }
}
