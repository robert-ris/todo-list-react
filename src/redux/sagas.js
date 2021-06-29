import { all } from 'redux-saga/effects';

import task from './tasks/sagas';

export default function* rootSaga() {
	yield all([
		task()
	])
}
