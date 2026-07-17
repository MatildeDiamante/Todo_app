// class to collect together the to-do items for a better
// manageability

import { TodoItem } from "./todoItem";

export class TodoCollection {
  private nextId: number = 1;

  constructor(
    public userName: string,
    public todoItems: TodoItem[] = [],
  ) {
    // no statement required
  }

  // the parameter is a string and the result a number
  addTodo(task: string): number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.todoItems.push(new TodoItem(this.nextId, task));
    return this.nextId;
  }

  getTodoById(id: number): TodoItem | undefined {
    return this.todoItems.find((item) => item.id === id);
  }
  markComplete(id: number, complete: boolean) {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.complete = complete;
    }
  }
}
