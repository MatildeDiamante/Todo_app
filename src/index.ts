import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
import inquirer from "inquirer";

let todos: TodoItem[] = [
  new TodoItem(1, "Answer Emails"),
  new TodoItem(2, "Add New Feature To Mobility App"),
  new TodoItem(3, "Get Shoes"),
  new TodoItem(4, "Write review", true),
];

let collection: TodoCollection = new TodoCollection("Matilde", todos);
//Filtering to include or exclude complete items
let showCompleted = true;

//console.clear();
//console.log(`${collection.userName}'s Todo List`);

function displayTodoList(): void {
  // incomplete items displayed
  console.log(
    `${collection.userName}'s Todo List` +
      ` (${collection.getItemCounts().incomplete} items to do)`,
  );
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

enum Commands {
  Toggle = "Show/Hide Completed",
  Quit = "Quit",
}

function promptUser(): void {
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
      }
    });
}

promptUser();
