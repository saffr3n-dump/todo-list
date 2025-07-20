import storage from '../../storage';
import createElement from '../../utils/create-element';
import navigateTo from '../../utils/navigate-to';
import allTodosPage from '../all-todos-page';
import reloadProjectLists from '../project-lists';
import dialog from './dialog';
import table from './table';

export default function (id) {
  const project = storage.projects[id];
  const modal = dialog(project);
  return createElement('div', {
    dataset: { id },
    children: [
      createElement('h1', { textContent: project.title }),
      createElement('p', { textContent: project.description }),
      table(project),
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
              storage.deleteProject(id);
              reloadProjectLists();
              navigateTo(allTodosPage());
            },
          }),
        ],
      }),
      modal,
      createElement('hr', {}),
    ],
  });
}
