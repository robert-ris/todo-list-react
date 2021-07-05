


import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import reducers from "./redux/reducers";
import sagas from "./redux/sagas";
import App from './App';
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers(history), compose(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas);

Amplify.configure(awsconfig)

ReactDOM.render(
	<Provider store={store}>
			<App />
	</Provider>,
	document.getElementById("root")
);

export { store, history };
