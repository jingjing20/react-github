import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const countInitialState = {
  count: 0,
}

const userInitialState = {
  username: 'jing'
}

const ADD = 'ADD'

function countReducer(state = countInitialState, action) {
  // console.log(state, action)
  switch (action.type) {
    case ADD:
      return { count: state.count + (action.num || 1) }
    default:
      return state
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.username
      }
    default:
      return state
  }
}

// 使用 combineReducers 合并 reducer
const allReducers = combineReducers({
  count: countReducer,
  username: userReducer
})

// createStore中 传入合并后的 reducer
const store = createStore(
  allReducers,
  {
    count: countInitialState,
    username: userInitialState
  },
  composeWithDevTools(applyMiddleware(ReduxThunk))
)

function add(num) {
  return {
    type: ADD,
    num,
  }
}

function addAsync(num) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add(num))
    }, 5000)
  }
}
console.log(store.getState())

store.dispatch(add(3))

store.subscribe(() => {
  console.log(store.getState())
})

// 通过 dispatch 一个 action 来操作数据
store.dispatch(addAsync(5))
store.dispatch({ type: UPDATE_USERNAME, username: 'jingjing20' })

// console.log(store.getState())

export default store