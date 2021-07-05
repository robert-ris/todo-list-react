import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import tasks from './tasks/reducers';

export default history =>
  combineReducers({
    router: connectRouter(history),
    tasks
  })
