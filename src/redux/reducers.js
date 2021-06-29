import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import task from './tasks/reducers';

export default history =>
	combineReducers({
		router: connectRouter(history),
    task,
	})