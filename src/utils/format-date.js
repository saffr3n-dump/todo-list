export default (date) => {
  return new Date(date).toLocaleDateString(undefined, { dateStyle: 'medium' });
};
