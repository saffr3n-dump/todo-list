import storage from '../../storage';
import createElement from '../../utils/create-element';
import navigateTo from '../../utils/navigate-to';
import projectPage from '../project-page';

const projectDropdown = document.querySelector('.new-todo #project');
const projectNav = document.querySelector('.nav-projects');

export default function reloadProjectLists() {
  projectDropdown.innerHTML = '';
  projectDropdown.append(
    ...Object.values(storage.projects).map((project) =>
      createElement('option', {
        value: project.id,
        textContent: project.title,
      }),
    ),
  );

  projectNav.innerHTML = '';
  projectNav.append(
    ...Object.values(storage.projects).map((project) =>
      createElement('li', {
        children: [
          createElement('a', {
            href: '#',
            textContent: project.title,
            dataset: { id: project.id },
          }),
        ],
      }),
    ),
  );
  projectNav.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') return;
    e.preventDefault();
    const id = e.target.dataset.id;
    navigateTo(projectPage(id));
  });
}
