import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS, TOGGLE_FILTER, SELECT_ORDER, UPDATE_FILTER, CLEAR_FILTER
} from '../actions'

const selectedReddit = (state = 'listings_residential', action) => {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
				my_areas: action.my_areas,
        lastUpdated: action.receivedAt

      }
    default:
      return state
  }
}

const postsByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.reddit]: posts(state[action.reddit], action)
      }
    default:
      return state
  }
}

const filterStatus = (state = {
	filter: false,
	criteria : {
		min_price: '',
		max_price: '',
		beds: '',
		baths: '',
		mls: '',
	}
	}, action) => {
		switch(action.type) {
			case TOGGLE_FILTER:
				return {
					...state,
					filter: !state.filter
				}
				case UPDATE_FILTER:
					return {
						...state,
						filter:true,
						criteria : action.filter
					}
				case CLEAR_FILTER:
					return {
						...state,
						filter:false,
						criteria: {
							min_price: '',
							max_price: '',
							beds: '',
							baths: '',
							mls: '',
						}
					}
			default:
				return state
		}
}
const sortStatus = (state = {order: 'asc'}, action) => {
		switch(action.type) {
			case SELECT_ORDER:
				return {
					...state,
					order: action.order
				}
				default:
					return state
		}
}
const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit,
	filterStatus,
	sortStatus,
	routerReducer
})

export default rootReducer
