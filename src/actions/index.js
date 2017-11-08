export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
export const TOGGLE_FILTER = 'TOGGLE_FILTER'
export const SELECT_ORDER = 'SELECT_ORDER'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'
var _ = require('lodash');
export const selectOrder = order => ({
	type: SELECT_ORDER,
	order
})
export const clearFilter = () => ({
	type: CLEAR_FILTER
})
export const updateFilter = filter => ({
	type: UPDATE_FILTER,
	filter
})

export const selectReddit = reddit => ({
  type: SELECT_REDDIT,
  reddit
})

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
})

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
})

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.map(child => child),
	my_areas: _.uniq(json.map(function(listing,i){ return listing.area})),
  receivedAt: Date.now()
})
export function toggleFilter() {
	return {
		type: TOGGLE_FILTER
	};
}

const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit))
  return fetch(`http://jasonseck.com:1337/${reddit}?key=jasonseck`)
    .then(response => response.json())
		.then(json => dispatch(receivePosts(reddit, json)))
}

const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit))
  }
}
