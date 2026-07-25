import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
import inquirer from "inquirer";
let todos = [
    new TodoItem(1, "Answer Emails"),
    new TodoItem(2, "Add New Feature To Mobility App"),
    new TodoItem(3, "Get Shoes"),
    new TodoItem(4, "Write review", true),
];
let collection = new TodoCollection("Matilde", todos);
//console.clear();
//console.log(`${collection.userName}'s Todo List`);
function displayTodoList() {
    // incomplete items displayed
    console.log(`${collection.userName}'s Todo List` +
        ` (${collection.getItemCounts().incomplete} items to do)`);
    //let newId: number = collection.addTodo("Update code");
    //let todoItem: TodoItem = collection.getTodoById(newId);
    //todoItem.printDetails();
    //collection.addTodo(todoItem);
    // item removal
    //collection.removeComplete();
    // call to getTodoItem method
    collection.getTodoItems(true).forEach((item) => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer
        .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands),
    })
        .then((answers) => {
        if (answers["command"] !== Commands.Quit) {
            promptUser();
        }
    });
}
promptUser();
