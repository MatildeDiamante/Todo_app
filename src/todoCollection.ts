// class to collect together the to-do items for a better
// manageability

import { TodoItem } from "./todoItem.js";

// method returning and object that describes the items in the collection
type ItemCounts = {
  total: number;
  incomplete: number;
};

export class TodoCollection {
  private nextId: number = 1;
  protected itemMap = new Map<number, TodoItem>();

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

  // remove complete items from the collection
  removeComplete() {
    this.itemMap.forEach((item) => {
      if (item.complete) {
        this.itemMap.delete(item.id);
      }
    });
  }

  getItemCounts(): ItemCounts {
    return {
      total: this.itemMap.size,
      incomplete: this.getTodoItems(false).length,
    };
  }
}
