import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import Counter from './Counter'
import { nextCountAPI } from './API'

const initialState = {
  count: 0,
  isFetching: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_NEXT_COUNT':
      return {
        ...state,
        isFetching: true,
      }
    case 'RECEIVE_NEXT_COUNT':
      return {
        ...state,
        count: action.nextCount,
        isFetching: false,
      }
    default:
      return state
  }
}

export const requestNextCount = () => ({
  type: 'REQUEST_NEXT_COUNT',
})
export const receiveNextCount = nextCount => ({
  type: 'RECEIVE_NEXT_COUNT',
  nextCount,
})
export const nextCount = () => (dispatch, getState) => {
  const { count } = getState()

  dispatch(requestNextCount())
  nextCountAPI(count).then(nextCount => {
    dispatch(receiveNextCount(nextCount))
  })
}


const store = createStore(reducer, applyMiddleware(thunk))

const render = () => {
  ReactDOM.render(
    <Counter store={store} />, 
    document.getElementById('root')
  )
}
render()
store.subscribe(render)