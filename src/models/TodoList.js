export default class TodoList {
  constructor(listTitle, hashTag = "") {
    this.listTitle = listTitle;
    this.hashTag = hashTag;
    this.todoList = [];
  }

  add(todo) {
    this.todoList.push(todo);
  }

  remove(index) {
    this.todoList.splice(index, 1);
  }

  renameTitle(newTitle) {
    this.listTitle = newTitle;
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

  updateHashTag(newHashTag) {
    this.hashTag = newHashTag;
  }
}
