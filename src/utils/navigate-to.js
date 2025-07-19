const main = document.querySelector('main');

export default (page) => {
  main.innerHTML = '';
  main.appendChild(page);
};
