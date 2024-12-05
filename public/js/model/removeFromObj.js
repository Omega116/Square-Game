export const removeFromObject = function (obj, id) {
  delete obj[`piece${id}`];
};
