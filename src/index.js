// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { Provider } from "react-redux";
// import { createBrowserHistory } from "history";
// import createSagaMiddleware from "redux-saga";
// import { createStore, applyMiddleware, compose } from "redux";
// import reducers from "./redux/reducers";
// import Amplify from 'aws-amplify'

// // import awsconfig from './aws-exports'

// const history = createBrowserHistory();
// // const sagaMiddleware = createSagaMiddleware();
// // const routeMiddleware = routerMiddleware(history);
// // const middlewares = [thunk, sagaMiddleware, routeMiddleware];
// // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
// 	reducers(history),
// );

// // Amplify.configure(awsconfig)

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//   </Provider>,
//   document.getElementById('root')
// );



import React from "react";
import ReactDOM from "react-dom";
// import * as Sentry from '@sentry/browser';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import reducers from "./redux/reducers";
import sagas from "./redux/sagas";
import Router from "router";
import App from './App';
// import Localization from "components/LayoutComponents/Localization";
import Amplify from 'aws-amplify'
// import * as serviceWorker from "./service-worker";
import awsconfig from './aws-exports'

// import "./global.scss";

// Sentry.init({dsn: "https://6ce97e9a76964226bf5a1b77e374344c@sentry.io/3390320"});

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
// const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducers(history),
	composeEnhancers(applyMiddleware(...middlewares)),
);
sagaMiddleware.run(sagas);

Amplify.configure(awsconfig)

ReactDOM.render(
	<Provider store={store}>
	
			<App />

	</Provider>,
	document.getElementById("root")
);

// serviceWorker.unregister();
export { store, history };
