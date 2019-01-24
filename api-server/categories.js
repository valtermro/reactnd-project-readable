const clone = require('clone');

const db = {};

const defaultData = {
  // The id of a category should be a unique string suitable for a readable url segment
  // as the client uses it to build the url for any resources under that category
  'react': {
    id: 'react',
    name: 'react',
  },
  'redux': {
    id: 'redux',
    name: 'redux',
  },
  'udacity': {
    id: 'udacity',
    name: 'udacity',
  },
};

function getData(token) {
  return db[token] = db[token] || clone(defaultData);
}

function get(token, id) {
  const data = getData(token);
  return Promise.resolve(data[id] || {});
}

function getAll(token) {
  return Promise.resolve(Object.values(getData(token)));
}

module.exports = { get, getAll };
