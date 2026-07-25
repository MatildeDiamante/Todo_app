"use strict";
// class to collect together the to-do items for a better
// manageability
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoCollection = void 0;
const todoItem_1 = require("./todoItem");
class TodoCollection {
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
        this.itemMap.set(this.nextId, new todoItem_1.TodoItem(this.nextId, task));
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
}
exports.TodoCollection = TodoCollection;
