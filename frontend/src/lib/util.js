// Taken from https://github.com/udacity/reactnd-chirper-app/blob/master/src/utils/_DATA.js#L235-L237
export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString('en-us');
}

export function normalizeResponse(objects) {
  return objects.reduce((accum, obj) => {
    accum[obj.id] = obj;
    return accum;
  }, {});
}

export function unique(array) {
  const result = [];
  for (const item of array) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}
