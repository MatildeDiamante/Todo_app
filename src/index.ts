import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

let todos: TodoItem[] = [
  new TodoItem(1, "Answer Emails"),
  new TodoItem(2, "Add New Feature To Mobility App"),
  new TodoItem(3, "Get Shoes"),
  new TodoItem(4, "Write review", true),
];

let collection: TodoCollection = new TodoCollection("Matilde", todos);

console.clear();
console.log(`${collection.userName}'s Todo List`);

let newId: number = collection.addTodo("Update code");
let todoItem: TodoItem = collection.getTodoById(newId)!;
todoItem.printDetails();

//collection.addTodo(todoItem);
