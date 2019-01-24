import { generateUID } from '../lib/util';

if (!localStorage.authToken) {
  localStorage.authToken = generateUID();
}

async function request(method, path, data) {
  const response = await fetch(`http://localhost:3001${path}`, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.authToken,
    },
  });

  return response.status === 200
    ? Promise.resolve(response.json())
    : Promise.reject(response.json());
}


export async function getCategory(id) {
  return request('get', `/categories/${id}`);
}

export function getCategories() {
  return request('get', '/categories');
}


export function createPost(data) {
  return request('post', '/posts', {
    id: generateUID(),
    timestamp: Date.now(),
    title: data.title,
    body: data.body,
    author: data.author,
    category: data.category,
  });
}

export function updatePost(id, data) {
  return request('put', `/posts/${id}`, {
    title: data.title,
    body: data.body,
    // timestamp: Date.now(),
  });
}

export function deletePost(id) {
  return request('delete', `/posts/${id}`);
}

export function getPost(id) {
  return request('get', `/posts/${id}`);
}

export function getPosts(category) {
  return category === 'all'
    ? request('get', '/posts')
    : request('get', `/${category}/posts`);
}

export function votePost(id, option) {
  return request('post', `/posts/${id}`, { option });
}


export function createComment(postId, data) {
  return request('post', '/comments', {
    id: generateUID(),
    timestamp: Date.now(),
    parentId: postId,
    body: data.body,
    author: data.author,
  });
}

export function updateComment(id, data) {
  return request('put', `/comments/${id}`, {
    timestamp: Date.now(),
    body: data.body,
  });
}

export function deleteComment(id) {
  return request('delete', `/comments/${id}`);
}

export function getComments(postId) {
  return request('get', `/posts/${postId}/comments`);
}

export function voteComment(id, option) {
  return request('post', `/comments/${id}`, { option });
}
