import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
import inquirer from "inquirer";
import { JsonTodoCollection } from "./jsonTodoCollection.js";

let todos: TodoItem[] = [
  new TodoItem(1, "Answer Emails"),
  new TodoItem(2, "Add New Feature To Mobility App"),
  new TodoItem(3, "Get Shoes"),
  new TodoItem(4, "Write review", true),
];

let collection: TodoCollection = new JsonTodoCollection("Matilde", todos);
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
  // create new tasks
  Add = "Add New Task",
  Complete = "Complete Task",

  Toggle = "Show/Hide Completed",
  Purge = "Remove Completed Tasks",

  Quit = "Quit",
}

function promptAdd(): void {
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
function promptComplete(): void {
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
      let completedTasks = answers["complete"] as number[];
      collection
        .getTodoItems(true)
        .forEach((item) =>
          collection.markComplete(
            item.id,
            completedTasks.find((id) => id === item.id) != undefined,
          ),
        );
      promptUser();
    });
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
        case Commands.Add:
          promptAdd();
          break;
        case Commands.Complete:
          if (collection.getItemCounts().incomplete > 0) {
            promptComplete();
          } else {
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
