class Project {
  constructor(title, description) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.todoIds = [];
  }

  static default() {
    return new Project(
      'Default',
      'This is a default project that is created automatically, when there ' +
        'are no other projects yet (e.g., during the first launch). It only ' +
        'exists for a demonstrative purpose and can be freely removed or ' +
        'modified.',
    );
  }
}

class Todo {
  constructor(title, description, dueDate, priority, projectId) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate).toISOString();
    this.priority = priority;
    this.complete = false;
    this.projectId = projectId;
  }

  static default(projectId) {
    const tomorrow = Date.now() + 1000 * 60 * 60 * 24;
    const dueDate = new Date(tomorrow);
    dueDate.setHours(0, 0, 0, 0);

    return new Todo(
      'Default',
      'This is a default todo that is created automatically alongside the ' +
        'default project it is placed into. It only exists for a ' +
        'demonstrative purpose and can be freely removed or modified.',
      dueDate.toISOString(),
      'Medium',
      projectId,
    );
  }
}

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

  updateProject(id, { title, description }) {
    const project = this.projects[id];
    title && (project.title = title);
    description && (project.description = description);
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

  countTodos() {
    return Object.keys(this.todos).length;
  }

  updateTodo(
    id,
    { title, description, dueDate, priority, complete, projectId },
  ) {
    const todo = this.todos[id];
    title && (todo.title = title);
    description && (todo.description = description);
    dueDate && (todo.dueDate = dueDate);
    priority && (todo.priority = priority);
    complete != null && (todo.complete = complete);
    if (!projectId) return this.#saveTable(Storage.#TABLE.TODOS, this.todos);
    const oldProject = this.projects(todo.projectId);
    const newProject = this.projects(projectId);
    todo.projectId = projectId;
    oldProject.todos = oldProject.todos.filter((id) => id !== todo.id);
    newProject.todos.push(todo.id);
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
