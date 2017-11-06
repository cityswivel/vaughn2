import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit, toggleFilter } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Header from '../components/Header'
import LazyLoad from 'react-lazyload';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Toggle from 'material-ui/Toggle';
import ScrollUpButton from "react-scroll-up-button";

var _ = require('lodash');


function sortPosts(posts) {
	var sorted = _.orderBy(posts, 'price','asc');
	return sorted;
}
function filterPosts(posts,filterStatus) {
	if (filterStatus == true) {
				return posts.filter(function(el){
					return el.price >= 0
					&& el.price <= 100000
				});
	}
	if (filterStatus == false) {
				return posts;
	}
}

class App extends Component {
  static propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedReddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedReddit))
		dispatch(fetchPostsIfNeeded('all_images'))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }

  handleChange = nextReddit => {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated, imagesisFetching, imageslastUpdated, images } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
			<Header />
        <Picker value={selectedReddit}
                onChange={this.handleChange}
                options={[ 'listings_residential', 'listings_commercial','listings_land', 'listings_multi_family' ]} />
					<Toggle
					      label="Filter"
								onToggle={(isInputChecked) => this.props.dispatch(toggleFilter())}
					/>
				<p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <RefreshIndicator size={40} left={10} top={0} status="loading"  /> : <h2>No Listings Found.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} images={images} />
            </div>
        }
				<ScrollUpButton
					EasingType='easeOutCubic'
					AnimationDuration={500}
				 />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }
	const {
    imagesisFetching,
    imageslastUpdated,
    items: images
  } = postsByReddit['all_images'] || {
    isFetching: true,
    items: []
  }
  return {
    selectedReddit,
    posts : sortPosts(filterPosts(posts,state.filterStatus)),
    isFetching,
    lastUpdated,
		imagesisFetching,
		imageslastUpdated,
		images,
  }
}

export default connect(mapStateToProps)(App)
