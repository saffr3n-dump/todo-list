import storage from '../../storage';
import createElement from '../../utils/create-element';
import formatDate from '../../utils/format-date';
import navigateTo from '../../utils/navigate-to';
import projectPage from '../project-page';

export default function (todo) {
  const project = storage.projects[todo.projectId];
  return createElement('table', {
    children: [
      createElement('tr', {
        children: [
          createElement('th', { textContent: 'ID' }),
          createElement('td', { textContent: todo.id }),
        ],
      }),
      createElement('tr', {
        children: [
          createElement('th', { textContent: 'Project' }),
          createElement('td', {
            children: [
              createElement('a', {
                href: '#',
                textContent: project.title,
                onclick: function (e) {
                  e.preventDefault();
                  navigateTo(projectPage(project.id));
                },
              }),
            ],
          }),
        ],
      }),
      createElement('tr', {
        children: [
          createElement('th', { textContent: 'Due Date' }),
          createElement('td', { textContent: formatDate(todo.dueDate) }),
        ],
      }),
      createElement('tr', {
        children: [
          createElement('th', { textContent: 'Priority' }),
          createElement('td', { textContent: todo.priority }),
        ],
      }),
      createElement('tr', {
        children: [
          createElement('th', { textContent: 'Complete' }),
          createElement('td', {
            children: [
              createElement('input', {
                type: 'checkbox',
                checked: todo.complete,
                onclick: function () {
                  storage.updateTodo(todo.id, { complete: !todo.complete });
                },
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
