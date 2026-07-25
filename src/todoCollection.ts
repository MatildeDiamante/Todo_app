// class to collect together the to-do items for a better
// manageability

import { TodoItem } from "./todoItem";

export class TodoCollection {
  private nextId: number = 1;
  private itemMap = new Map<number, TodoItem>();

  constructor(
    public userName: string,
    todoItems: TodoItem[] = [],
  ) {
    todoItems.forEach((item) => this.itemMap.set(item.id, item));
  }

  // the parameter is a string and the result a number
  addTodo(task: string): number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
    return this.nextId;
  }

  getTodoById(id: number): TodoItem | undefined {
    return this.itemMap.get(id);
  }

  // display a list of items
  // adds a method to access the TodoItem object
  getTodoItems(includeComplete: boolean): TodoItem[] {
    return [...this.itemMap.values()].filter(
      (item) => includeComplete || !item.complete,
    );
  }

  markComplete(id: number, complete: boolean) {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.complete = complete;
    }
  }
}
