import { notification } from 'antd';
import axios from 'axios'
// import store from 'store'


const task = {}

const taskApi = axios.create({
  baseURL: process.env.TASKS_APP_API
})

taskApi.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  const { data } = response
  if (data) {
    if (data.statusCode !== 401) {
      notification.error({
        message: 'Could not load data',
        description: 'System could not communicate properly with the endpoints',
      })
    }
  }
})

task.get = async (endpoint, params = null) => {
  return taskApi
    .get(endpoint, { params })
    .then(response => response)
    .catch(err => {
      return err
    })
}

task.post = async (endpoint, data) => {
  return taskApi
    .post(endpoint, data)
    .then(response => response)
    .catch(err => {
      return err
    })
}

task.delete = async endpoint => {
  return taskApi
    .put(endpoint)
    .then(response => response)
    .catch(err => {
      return err
    })
}

task.patch = async (endpoint, params) => {
  return taskApi
    .patch(endpoint, { params })
    .then(response => response)
    .catch(err => {
      return err
    })
}

export default taskApi