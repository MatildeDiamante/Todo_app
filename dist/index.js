"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
let todos = [
    new todoItem_1.TodoItem(1, "Answer Emails"),
    new todoItem_1.TodoItem(2, "Add New Feature To Mobility App"),
    new todoItem_1.TodoItem(3, "Get Shoes"),
    new todoItem_1.TodoItem(4, "Write review", true),
];
let collection = new todoCollection_1.TodoCollection("Matilde", todos);
console.clear();
console.log(`${collection.userName}'s Todo List`);
//let newId: number = collection.addTodo("Update code");
//let todoItem: TodoItem = collection.getTodoById(newId);
//todoItem.printDetails();
//collection.addTodo(todoItem);
// item removal
collection.removeComplete();
// call to getTodoItem method
collection.getTodoItems(true).forEach((item) => item.printDetails());
