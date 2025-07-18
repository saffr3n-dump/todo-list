export default class Todo {
  constructor(title, description, dueDate, priority, projectId) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = Todo.#formatDate(new Date(dueDate));
    this.priority = priority;
    this.projectId = projectId;
  }

  static #formatDate(date) {
    return date.toLocaleDateString(undefined, { dateStyle: 'short' });
  }

  static default(projectId) {
    return new Todo(
      'Default',
      'This is a default todo that is created automatically alongside the ' +
        'default project it is placed into. It only exists for a ' +
        'demonstrative purpose and can be freely removed or modified.',
      Todo.#formatDate(new Date()),
      'Medium',
      projectId,
    );
  }
}
