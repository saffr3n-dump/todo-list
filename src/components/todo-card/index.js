import './style.css';
import storage from '../../storage';
import todoPage from '../todo-page';
import navigateTo from '../../utils/navigate-to';
import createElement from '../../utils/create-element';
import formatDate from '../../utils/format-date';

export default ({ id, title, description, dueDate, priority, complete }) => {
  return createElement('div', {
    className: 'card',
    dataset: { id },
    children: [
      createElement('h2', { textContent: title }),
      createElement('p', { textContent: description }),
      createElement('dl', {
        children: [
          createElement('div', {
            children: [
              createElement('dt', { textContent: 'Due Date' }),
              createElement('dd', { textContent: formatDate(dueDate) }),
            ],
          }),
          createElement('div', {
            children: [
              createElement('dt', { textContent: 'Priority' }),
              createElement('dd', { textContent: priority }),
            ],
          }),
          createElement('div', {
            children: [
              createElement('dt', { textContent: 'Complete' }),
              createElement('dd', {
                children: [
                  createElement('input', {
                    type: 'checkbox',
                    checked: complete,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      createElement('button', { textContent: 'View' }),
    ],
    onclick: (e) => {
      const id = e.currentTarget.dataset.id;
      const todo = storage.todos[id];
      switch (e.target.tagName) {
        case 'INPUT':
          return storage.updateTodo(id, { complete: !todo.complete });
        case 'BUTTON':
          return navigateTo(todoPage(id));
      }
    },
  });
};
