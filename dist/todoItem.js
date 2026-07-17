"use strict";
// data model that describes the application's data and
// the actions that can be performed on it
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItem = void 0;
// class defining id, task and complete properties
class TodoItem {
    id;
    task;
    complete;
    constructor(id, task, complete = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
        // no statements required
    }
    // method described by the class
    // writes the a summery of the to-do item on the console
    printDetails() {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
    }
}
exports.TodoItem = TodoItem;
