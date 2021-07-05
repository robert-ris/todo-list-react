import { all } from 'redux-saga/effects';

import tasks from './tasks/sagas';

export default function* rootSaga() {
	yield all([
		tasks()
	])
}
