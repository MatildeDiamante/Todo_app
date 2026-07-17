// data model that describes the application's data and
// the actions that can be performed on it

// class defining id, task and complete properties
export class TodoItem {
  constructor(
    public id: number,
    public task: string,
    public complete: boolean = false,
  ) {
    // no statements required
  }

  // method described by the class
  // writes the a summery of the to-do item on the console
  public printDetails(): void {
    console.log(
      `${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`,
    );
  }
}
