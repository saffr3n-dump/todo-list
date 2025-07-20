import storage from '../../storage';
import createElement from '../../utils/create-element';
import navigateTo from '../../utils/navigate-to';
import todoPage from '.';

export default function (todo) {
  return createElement('dialog', {
    children: [
      createElement('h1', { textContent: 'Update Todo' }),
      createElement('form', {
        method: 'dialog',
        children: [
          createElement('label', {
            textContent: 'Title',
            for: 'title',
            children: [
              createElement('input', {
                type: 'text',
                name: 'title',
                id: 'title',
                value: todo.title,
              }),
            ],
          }),
          createElement('label', {
            textContent: 'Description',
            for: 'description',
            children: [
              createElement('textarea', {
                name: 'description',
                id: 'description',
                textContent: todo.description,
              }),
            ],
          }),
          createElement('label', {
            textContent: 'Due Date',
            for: 'dueDate',
            children: [
              createElement('input', {
                type: 'date',
                name: 'dueDate',
                id: 'dueDate',
                value: todo.dueDate.substr(0, 10),
              }),
            ],
          }),
          createElement('label', {
            textContent: 'Priority',
            for: 'priority',
            children: [
              createElement('select', {
                name: 'priority',
                id: 'priority',
                children: [
                  createElement('option', {
                    value: 'Low',
                    textContent: 'Low',
                    selected: todo.priority === 'Low',
                  }),
                  createElement('option', {
                    value: 'Medium',
                    textContent: 'Medium',
                    selected: todo.priority === 'Medium',
                  }),
                  createElement('option', {
                    value: 'High',
                    textContent: 'High',
                    selected: todo.priority === 'High',
                  }),
                ],
              }),
            ],
          }),
          createElement('label', {
            textContent: 'Complete',
            for: 'complete',
            children: [
              createElement('input', {
                type: 'checkbox',
                name: 'complete',
                id: 'complete',
                checked: todo.complete,
              }),
            ],
          }),
          createElement('label', {
            textContent: 'Project',
            for: 'project',
            children: [
              createElement('select', {
                name: 'project',
                id: 'project',
                children: Object.values(storage.projects).map(({ id, title }) =>
                  createElement('option', {
                    textContent: title,
                    value: id,
                    selected: todo.projectId === id,
                  }),
                ),
              }),
            ],
          }),
          createElement('div', {
            className: 'controls',
            children: [
              createElement('button', {
                type: 'submit',
                textContent: 'Submit',
              }),
              createElement('button', {
                type: 'button',
                textContent: 'Cancel',
                onclick: function () {
                  // button -> .controls -> form -> dialog
                  this.parentElement.parentElement.parentElement.close();
                },
              }),
            ],
          }),
        ],
        onsubmit: function () {
          const { project: projectId, ...rest } = Object.fromEntries(
            new FormData(this),
          );
          rest.complete = !!rest.complete;
          storage.updateTodo(todo.id, { ...rest, projectId });
          navigateTo(todoPage(todo.id));
        },
      }),
    ],
  });
}
