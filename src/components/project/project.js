export default class Project {
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
