import './style.css';
import allTodosPage from './components/all-todos-page';
import navigateTo from './utils/navigate-to';
import reloadNavProjects from './components/nav-projects';

const logo = document.querySelector('.logo');
logo.addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo(allTodosPage());
});

const todoNav = document.querySelector('.nav-todos');
todoNav.addEventListener('click', (e) => {
  if (e.target.tagName !== 'A') return;
  e.preventDefault();
  switch (e.target.textContent) {
    case 'All':
      navigateTo(allTodosPage());
      break;
    case 'Today':
      break;
    case 'This Week':
      break;
  }
});

reloadNavProjects();
navigateTo(allTodosPage());
