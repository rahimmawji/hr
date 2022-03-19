export const removeEmpty = (obj) => {
  Object.keys(obj).forEach(key =>
    (obj[key] && typeof obj[key] === 'object') && removeEmpty(obj[key]) ||
    (obj[key] === undefined || obj[key] === '') && delete obj[key]
  );
  return obj;
}