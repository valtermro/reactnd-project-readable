require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const categories = require('./categories');
const posts = require('./posts');
const comments = require('./comments');

const app = express();

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the Udacity Readable API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /categories
      USAGE:
        Get all of the categories available for the app. List is found in categories.js.
        Feel free to extend this list as you desire.

    GET /:category/posts
      USAGE:
        Get all of the posts for a particular category

    GET /posts
      USAGE:
        Get all of the posts. Useful for the main page when no category is selected.

    POST /posts
      USAGE:
        Add a new post

      PARAMS:
        id - UUID should be fine, but any unique id will work
        timestamp - timestamp in whatever format you like, you can use Date.now() if you like
        title - String
        body - String
        author - String
        category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

    GET /posts/:id
      USAGE:
        Get the details of a single post

    POST /posts/:id
      USAGE:
        Used for voting on a post
      PARAMS:
        option - String: Either "up" or "down"

    PUT /posts/:id
      USAGE:
        Edit the details of an existing post
      PARAMS:
        title - String
        body - String

    DELETE /posts/:id
      USAGE:
        Sets the deleted flag for a post to 'true'.
        Sets the parentDeleted flag for all child comments to 'true'.

    GET /posts/:id/comments
      USAGE:
        Get all the comments for a single post

    POST /comments
      USAGE:
        Add a comment to a post

      PARAMS:
        id: Any unique ID. As with posts, UUID is probably the best here.
        timestamp: timestamp. Get this however you want.
        body: String
        author: String
        parentId: Should match a post id in the database.

    GET /comments/:id
      USAGE:
        Get the details for a single comment

    POST /comments/:id
      USAGE:
        Used for voting on a comment.
      PARAMS:
        option - String: Either "up" or "down"

    PUT /comments/:id
      USAGE:
        Edit the details of an existing comment

      PARAMS:
        timestamp: timestamp. Get this however you want.
        body: String

    DELETE /comments/:id
      USAGE:
        Sets a comment's deleted flag to 'true'
 </pre>
  `;

  return res.json(help);
});

app.use((req, res, next) => {
  const token = req.get('Authorization');

  if (token) {
    req.token = token;
    next();
  } else {
    res.status(403).json({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)',
    });
  }
});


app.get('/categories', (req, res) => {
  categories.getAll(req.token)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.get('/categories/:id', (req, res) => {
  categories.get(req.token, req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.get('/:category/posts', (req, res) => {
  posts.getByCategory(req.token, req.params.category)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.get('/posts', (req, res) => {
  posts.getAll(req.token)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.post('/posts', bodyParser.json(), (req, res) => {
  posts.add(req.token, req.body)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.get('/posts/:id', (req, res) => {
  posts.get(req.token, req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.delete('/posts/:id', (req, res) => {
  posts.disable(req.token, req.params.id)
    .then((post) => {
      return comments.disableByParent(req.token, post);
    })
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.post('/posts/:id', bodyParser.json(), (req, res) => {
  posts.vote(req.token, req.params.id, req.body.option)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.put('/posts/:id', bodyParser.json(), (req, res) => {
  posts.edit(req.token, req.params.id, req.body)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.get('/posts/:id/comments', (req, res) => {
  comments.getByParent(req.token, req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.get('/comments/:id', (req, res) => {
  comments.get(req.token, req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.put('/comments/:id', bodyParser.json(), (req, res) => {
  comments.edit(req.token, req.params.id, req.body)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.post('/comments', bodyParser.json(), (req, res) => {
  comments.add(req.token, req.body)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.post('/comments/:id', bodyParser.json(), (req, res) => {
  comments.vote(req.token, req.params.id, req.body.option)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.delete('/comments/:id', (req, res) => {
  comments.disable(req.token, req.params.id)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'There was an error.' });
    });
});

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port);
});
