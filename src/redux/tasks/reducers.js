import actions from './actions'

const initialState = {
  tasksList: [],
  task: {}
}

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
