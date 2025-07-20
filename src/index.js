import './style.css';
import allTodosPage from './components/all-todos-page';
import navigateTo from './utils/navigate-to';
import reloadProjectLists from './components/project-lists';
import storage from './storage';
import todoPage from './components/todo-page';

const logo = document.querySelector('.logo');
logo.addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo(allTodosPage());
});

const [newTodoBtn, newProjBtn] = document.querySelectorAll('nav button');
newTodoBtn.onclick = function () {
  document.querySelector('.new-todo').showModal();
};
newProjBtn.onclick = function () {
  document.querySelector('.new-project').showModal();
};

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

const newTodoModal = document.querySelector('.new-todo');
const newTodoForm = newTodoModal.querySelector('form');
newTodoForm.onsubmit = function () {
  const { title, description, dueDate, priority, project } = Object.fromEntries(
    new FormData(newTodoForm),
  );
  const todo = storage.createTodo(
    title,
    description,
    dueDate,
    priority,
    project,
  );
  newTodoForm.reset();
  navigateTo(todoPage(todo.id));
};
const newTodoModalCancelBtn = newTodoForm.querySelector(
  'button[type="button"]',
);
newTodoModalCancelBtn.onclick = function () {
  newTodoModal.close();
};

reloadProjectLists();
navigateTo(allTodosPage());
