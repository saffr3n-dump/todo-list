export default (tag, props) => {
  const { children = [], dataset = {}, ...rest } = props;
  const element = Object.assign(document.createElement(tag), rest);
  element.append(...children);
  Object.entries(dataset).forEach(([key, value]) =>
    element.setAttribute(`data-${key}`, value),
  );
  return element;
};
