import { API } from 'aws-amplify';

const taskApi = {
  getTasks() {
    return API.get("TASKS_API", '/tasks')
      .then((response) => response)
      .catch ((e) => {
        console.log('e', e);
        return [];
      })
  }
}

export default taskApi;