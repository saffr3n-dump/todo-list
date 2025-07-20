import storage from '../../storage';
import todoCard from '../todo-card';
import createElement from '../../utils/create-element';

export default () => {
  return createElement('div', {
    children: [
      createElement('h1', { textContent: 'All Todos' }),
      storage.countTodos()
        ? createElement('div', {
            className: 'container',
            children: Object.values(storage.todos).map((todo) =>
              todoCard(todo),
            ),
          })
        : createElement('p', { textContent: 'There are no todos yet.' }),
    ],
  });
};
