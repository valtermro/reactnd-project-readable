const clone = require('clone');
const posts = require('./posts');

const db = {};

const defaultData = {
  'fo7cnkrbi6a8ok7bqi3ynm': {
    id: 'fo7cnkrbi6a8ok7bqi3ynm',
    parentId: '4tvzo9mkfmajw8phfjk18s',
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false,
  },
  'w5wfvnvc1xirr51oz387ne': {
    id: 'w5wfvnvc1xirr51oz387ne',
    parentId: '4tvzo9mkfmajw8phfjk18s',
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false,
  },
};

function getData(token) {
  return db[token] = db[token] || clone(defaultData);
}

function getByParent(token, parentId) {
  const comments = getData(token);
  const result = Object.keys(comments)
    .filter(id => comments[id].parentId === parentId && !comments[id].deleted && !comments[id].parentDeleted)
    .map(id => comments[id]);
  return Promise.resolve(result);
}

function get(token, id) {
  const comment = getData(token)[id];
  return Promise.resolve(!comment || comment.deleted || comment.parentDeleted ? {} : comment);
}

function add(token, data) {
  const comments = getData(token);

  comments[data.id] = {
    id: data.id,
    timestamp: data.timestamp,
    body: data.body,
    author: data.author,
    parentId: data.parentId,
    voteScore: 1,
    deleted: false,
    parentDeleted: false,
  };

  posts.incrementCommentCounter(token, data.parentId, 1);
  return Promise.resolve(comments[data.id]);
}

function vote(token, id, option) {
  const comment = getData(token)[id];

  switch (option) {
    case 'up': {
      comment.voteScore = comment.voteScore + 1;
      break;
    }
    case 'down': {
      comment.voteScore = comment.voteScore - 1;
      break;
    }
    default: {
      console.log(`comments.vote received incorrect parameter: ${option}`);
    }
  }
  return Promise.resolve(comment);
}

function disableByParent(token, post) {
  const comments = getData(token);
  Object.keys(comments)
    .filter(id => comments[id].parentId === post.id)
    .forEach(id => comments[id].parentDeleted = true);
  return Promise.resolve(post);
}

function disable(token, id) {
  const comment = getData(token)[id];
  if (!comment.deleted) {
    comment.deleted = true;
    posts.incrementCommentCounter(token, comment.parentId, -1);
  }
  return Promise.resolve(comment);
}

function edit(token, id, data) {
  const comment = getData(token)[id];
  for (const key in data) {
    comment[key] = data[key];
  }
  return Promise.resolve(comment);
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit,
};
