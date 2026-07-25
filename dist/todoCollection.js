// class to collect together the to-do items for a better
// manageability
import { TodoItem } from "./todoItem.js";
export class TodoCollection {
    userName;
    nextId = 1;
    itemMap = new Map();
    constructor(userName, todoItems = []) {
        this.userName = userName;
        todoItems.forEach((item) => this.itemMap.set(item.id, item));
    }
    // the parameter is a string and the result a number
    addTodo(task) {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }
    getTodoById(id) {
        return this.itemMap.get(id);
    }
    // display a list of items
    // adds a method to access the TodoItem object
    getTodoItems(includeComplete) {
        return [...this.itemMap.values()].filter((item) => includeComplete || !item.complete);
    }
    markComplete(id, complete) {
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
    getItemCounts() {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length,
        };
    }
}
