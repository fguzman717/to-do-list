export default class TodoList {
  constructor() {
    this.todoList = [];
  }

  add(todo) {
    this.todoList.push(todo);
  }

  remove(index) {
    this.todoList.splice(index, 1);
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
