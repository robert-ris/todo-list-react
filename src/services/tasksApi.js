import taskApi from 'axios/index';

const tasksApi = {
  getTasks(params) {
    return (taskApi)
      .get('tasks', {params})
      .then(response => response)
      .catch (err => {
        console.log(err)
        return err
      }) 
  },

  deleteTask(payload) {
    return taskApi
      .delete(`tasks/${payload}`)
      .then(response => response)
      .catch(err => {
        console.log(err)
        return err
      })
  },

  getTask(payload) {
    console.log('payload', payload)
    return taskApi
      .get(`tasks/${payload.id}`)
      .then(response => response)
      .catch(err => {
        console.log(err)
        return err
      })
  },

  updateTask(payload) {
    return taskApi
      .patch(`tasks/${payload.id}`, {...payload} )
      .then(response => response)
      .catch(err => {
        console.log(err)
        return err
      })
  },

  updateStatus(payload) {
    return taskApi
      .patch(`tasks/update-status/${payload.id}`, {...payload} )
      .then(response => response)
      .catch(err => {
        console.log(err)
        return err
      })
  },
}

export default tasksApi;