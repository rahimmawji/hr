const omitTypename = (key, value) =>
  key === "__typename" ? undefined : value;

export const omitTypeName = (obj) => JSON.parse(
  JSON.stringify(obj),
  omitTypename
);
