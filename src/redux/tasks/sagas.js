import { notification } from 'antd';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import taskApi from '../../services/tasksApi';

import actions from './actions';

export function* GET_TASKS() {
  yield put({
    type: 'tasks/SET_STATE',
  })

  const response = yield call(taskApi.getTasks)

  if ( response ) {
    yield put({
      type: 'tasks/SET_STATE',
      payload: {
        date: response
      }
    })
  } else {
    notification.error({
			message: 'Could not load data',
			description: 'System could not communicate properly with the endpoints',
		})
  }

  yield put({
		type: 'currencies/SET_STATE',
		payload: {
			loading: false,
		},
	})
}

export default function* rootSaga() {
	yield all([
		takeEvery(actions.GET_TASKS, GET_TASKS),
	])
}