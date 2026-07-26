import { TodoItem } from "./todoItem.js";
import inquirer from "inquirer";
import { JsonTodoCollection } from "./jsonTodoCollection.js";
let todos = [
    new TodoItem(1, "Answer Emails"),
    new TodoItem(2, "Add New Feature To Mobility App"),
    new TodoItem(3, "Get Shoes"),
    new TodoItem(4, "Write review", true),
];
let collection = new JsonTodoCollection("Matilde", todos);
//Filtering to include or exclude complete items
let showCompleted = true;
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
    //collection.getTodoItems(true).forEach((item) => item.printDetails());
    collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}
var Commands;
(function (Commands) {
    // create new tasks
    Commands["Add"] = "Add New Task";
    Commands["Complete"] = "Complete Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Purge"] = "Remove Completed Tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptAdd() {
    console.clear();
    inquirer
        .prompt({ type: "input", name: "add", message: "Enter task:" })
        .then((answers) => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
}
// mark completed tasks and remove them
function promptComplete() {
    console.clear();
    inquirer
        .prompt({
        type: "checkbox",
        name: "complete",
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showCompleted).map((item) => ({
            name: item.task,
            value: item.id,
            checked: item.complete,
        })),
    })
        .then((answers) => {
        let completedTasks = answers["complete"];
        collection
            .getTodoItems(true)
            .forEach((item) => collection.markComplete(item.id, completedTasks.find((id) => id === item.id) != undefined));
        promptUser();
    });
}
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
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    });
}
promptUser();
