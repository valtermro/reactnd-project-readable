import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware } from 'redux';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({ collapsed: true }));
}

export default applyMiddleware(...middleware);
