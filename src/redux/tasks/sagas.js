import { all, put, call, takeEvery } from 'redux-saga/effects';
import index from '../../axios/index';
import { notification } from 'antd';
import tasksApi from '../../services/tasksApi'
// import { history } from 'index'

import actions from './actions';

export function* GET_TASKS() {
  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield index.get(`tasks`)

  if (response && response.status === 200) {
    yield put({
      type: 'tasks/SET_STATE',
      payload: {
        tasksList: response.data,
      },
    })
  }
  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* ADD_TASK({ payload }) {
  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield index.post(`tasks`, payload)
  if (response) {
		yield put({ type: 'tasks/GET_TASKS' })
		notification.success({
			message: 'Success!',
			description: 'New task added!',
		})
	} else {
		notification.error({
			message: 'Could not load data',
			description: 'System could not communicate properly with the endpoints',
		})
	}

  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* DELETE_TASK({ payload }) {
  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(tasksApi.deleteTask, payload)

  if (response && response.status === 200) {
		yield put({ type: 'tasks/GET_TASKS' })
		notification.success({
			message: 'Success!',
			description: 'Task removed!',
		})
	} else {
		notification.error({
			message: 'Could not load data',
			description: 'System could not communicate properly with the endpoints',
		})
	}

  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_TASK({ payload }) {
  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(tasksApi.getTask, payload)

  if (response && response.status === 200) {
		yield put({
      type: 'tasks/SET_STATE',
      payload: {
        task: response.data,
      },
    })
	} 
  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* UPDATE_TASK({ payload }) {
  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(tasksApi.updateTask, payload)
  if (response && response.status === 200) {
		yield put({ 
      type: 'tasks/GET_TASKS',
    })
    yield put({ 
      type: 'tasks/GET_TASK',
      payload: {
        id: payload.id,
      },
    })
		notification.success({
			message: 'Success!',
			description: 'Task updated!',
		})
	} else {
		notification.error({
			message: 'Could not load data',
			description: 'System could not communicate properly with the endpoints',
		})
	}

  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* UPDATE_STATUS({ payload }) {
  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(tasksApi.updateStatus, payload)
  if (response && response.status === 200) {
		yield put({ 
      type: 'tasks/GET_TASKS',
    })
    yield put({ 
      type: 'tasks/GET_TASK',
      payload: {
        id: payload.id,
      },
    })
		notification.success({
			message: 'Success!',
			description: 'Status updated!',
		})
	} else {
		notification.error({
			message: 'Could not load data',
			description: 'System could not communicate properly with the endpoints',
		})
	}

  yield put({
    type: 'tasks/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export default function* rootSaga() {
	yield all([
		takeEvery(actions.GET_TASKS, GET_TASKS),
    takeEvery(actions.ADD_TASK, ADD_TASK),
    takeEvery(actions.DELETE_TASK, DELETE_TASK),
    takeEvery(actions.GET_TASK, GET_TASK),
    takeEvery(actions.UPDATE_TASK, UPDATE_TASK),
    takeEvery(actions.UPDATE_STATUS, UPDATE_STATUS)
	])
}