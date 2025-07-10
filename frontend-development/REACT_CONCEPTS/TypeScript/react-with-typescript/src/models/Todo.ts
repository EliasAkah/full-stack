//Defining a typescript calss to create a data model
class Todo {
  id: string;
  text: string;

  constructor(todo: string) {
    this.text = todo;
    this.id = new Date().toISOString();
  }
}

export default Todo;
