import Project from './project';
import Todo from './todo';

class Storage {
  static #TABLE = { PROJECTS: 'projects', TODOS: 'todos' };
  #storage;

  constructor() {
    this.#storage = window.localStorage;
    this.projects = this.#loadTable(Storage.#TABLE.PROJECTS) ?? {};
    this.todos = this.#loadTable(Storage.#TABLE.TODOS) ?? {};

    if (!Object.keys(this.projects).length) {
      const defaultProject = Project.default();
      const defaultTodo = Todo.default(defaultProject.id);
      defaultProject.todoIds.push(defaultTodo.id);
      this.projects[defaultProject.id] = defaultProject;
      this.todos[defaultTodo.id] = defaultTodo;
    }

    this.#sync();
  }

  createProject(title, description) {
    const project = new Project(title, description);
    this.projects[project.id] = project;
    this.#saveTable(Storage.#TABLE.PROJECTS, this.projects);
  }

  deleteProject(id) {
    this.deleteTodos(...this.projects[id].todoIds);
    delete this.projects[id];
    this.#sync();
  }

  createTodo(title, description, dueDate, priority, projectId) {
    const todo = new Todo(title, description, dueDate, priority, projectId);
    const project = this.projects[projectId];
    project.todoIds.push(todo.id);
    this.todos[todo.id] = todo;
    this.#sync();
  }

  deleteTodos(...ids) {
    const projectId = this.todos[ids[0]].projectId;
    const project = this.projects[projectId];
    project.todoIds = project.todoIds.filter((todoId) => !ids.includes(todoId));

    for (let id of ids) {
      delete this.todos[id];
    }

    this.#sync();
  }

  #loadTable(key) {
    try {
      const raw = this.#storage.getItem(key);
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object') return parsed;
      return null;
    } catch {
      return null;
    }
  }

  #saveTable(key, table) {
    const string = JSON.stringify(table);
    this.#storage.setItem(key, string);
  }

  #sync() {
    this.#saveTable(Storage.#TABLE.PROJECTS, this.projects);
    this.#saveTable(Storage.#TABLE.TODOS, this.todos);
  }
}

export default new Storage();
