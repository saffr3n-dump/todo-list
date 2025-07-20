import storage from '../../storage';
import createElement from '../../utils/create-element';
import navigateTo from '../../utils/navigate-to';
import projectPage from '.';
import reloadNavProjects from '../nav-projects';

export default function (project) {
  return createElement('dialog', {
    children: [
      createElement('h1', { textContent: 'Update Project' }),
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
                value: project.title,
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
                textContent: project.description,
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
          const data = Object.fromEntries(new FormData(this));
          storage.updateProject(project.id, data);
          reloadNavProjects();
          navigateTo(projectPage(project.id));
        },
      }),
    ],
  });
}
