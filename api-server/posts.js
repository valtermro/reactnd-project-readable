const clone = require('clone');

const db = {};

const defaultData = {
  '4tvzo9mkfmajw8phfjk18s': {
    id: '4tvzo9mkfmajw8phfjk18s',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2,
  },
  'pasicpejhzjeuvc3q2usds': {
    id: 'pasicpejhzjeuvc3q2usds',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0,
  },
};

function getData(token) {
  return db[token] = db[token] || clone(defaultData);
}

function getByCategory(token, category) {
  const posts = getData(token);
  const result = Object.keys(posts)
    .filter(id => posts[id].category === category && !posts[id].deleted)
    .map(id => posts[id]);
  return Promise.resolve(result);
}

function get(token, id) {
  const post = getData(token)[id];
  return Promise.resolve(!post || post.deleted ? {} : post);
}

function getAll(token) {
  const posts = getData(token);
  const result = Object.keys(posts)
    .filter(id => !posts[id].deleted)
    .map(id => posts[id]);
  return Promise.resolve(result);
}

function add(token, data) {
  const posts = getData(token);

  posts[data.id] = {
    id: data.id,
    timestamp: data.timestamp,
    title: data.title,
    body: data.body,
    author: data.author,
    category: data.category,
    voteScore: 1,
    deleted: false,
    commentCount: 0,
  };

  return Promise.resolve(posts[data.id]);
}

function vote(token, id, option) {
  const post = getData(token)[id];
  switch (option) {
    case 'up': {
      post.voteScore = post.voteScore + 1;
      break;
    }
    case 'down': {
      post.voteScore = post.voteScore - 1;
      break;
    }
    default: {
      console.log(`posts.vote received incorrect parameter: ${option}`);
    }
  }
  return Promise.resolve(post);
}

function disable(token, id) {
  const post = getData(token)[id];
  post.deleted = true;
  return Promise.resolve(post);
}

function edit(token, id, data) {
  const post = getData(token)[id];
  for (const key in data) {
    post[key] = data[key];
  }
  return Promise.resolve(post);
}

function incrementCommentCounter(token, id, count) {
  const post = getData(token)[id];
  if (post) {
    post.commentCount += count;
  }
}

module.exports = {
  add,
  get,
  getAll,
  getByCategory,
  edit,
  vote,
  disable,
  incrementCommentCounter,
};
