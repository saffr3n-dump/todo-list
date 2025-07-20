import createElement from '../../utils/create-element';

export default function (project) {
  return createElement('table', {
    children: [
      createElement('tr', {
        children: [
          createElement('th', { textContent: 'ID' }),
          createElement('td', { textContent: project.id }),
        ],
      }),
      createElement('tr', {
        children: [
          createElement('th', { textContent: 'Todos' }),
          createElement('td', { textContent: project.todoIds.length }),
        ],
      }),
    ],
  });
}
