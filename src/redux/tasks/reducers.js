import actions from './actions';

const initialState = {
  data: []
}

export default function tasksReducer(state = initialState, action) {
  switch (actions.type) {
    case actions.SET_STATE:
      return { ...state, ...actions.payload }
    default: 
      return state;
  }
}