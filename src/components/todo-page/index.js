import storage from '../../storage';
import createElement from '../../utils/create-element';
import navigateTo from '../../utils/navigate-to';
import allTodosPage from '../all-todos-page';
import table from './table';
import dialog from './dialog';

export default function (id) {
  const todo = storage.todos[id];
  const modal = dialog(todo);
  return createElement('div', {
    dataset: { id },
    children: [
      createElement('h1', { textContent: todo.title }),
      createElement('p', { textContent: todo.description }),
      table(todo),
      createElement('div', {
        className: 'controls',
        children: [
          createElement('button', {
            textContent: 'Edit',
            onclick: function () {
              modal.showModal();
            },
          }),
          createElement('button', {
            textContent: 'Delete',
            onclick: function () {
              storage.deleteTodos(id);
              navigateTo(allTodosPage());
            },
          }),
        ],
      }),
      modal,
    ],
  });
}
