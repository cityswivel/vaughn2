import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit, toggleFilter, selectOrder } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Header from '../components/Header'
import LazyLoad from 'react-lazyload';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Toggle from 'material-ui/Toggle';
import ScrollUpButton from "react-scroll-up-button";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import OrderPicker from '../components/OrderPicker';
var _ = require('lodash');


function sortPosts(listings) {
	console.log(listings);
	switch(listings.order) {
		case 'asc':
			var sorted = _.orderBy(listings.listings, 'price','asc');
			break;
		case 'desc':
			var sorted = _.orderBy(listings.listings, 'price','desc');
			break;
		case 'newold' :
			var sorted = _.orderBy(listings.listings, 'mls','desc');
			break;
		case 'oldnew' :
			var sorted = _.orderBy(listings.listings, 'mls','asc');
			break;
		default:
			var sorted = _.orderBy(listings.listings, 'price','asc');
	}

	return sorted;
}
function filterPosts(posts,filterStatus,orderStatus) {

	if (filterStatus === true) {
console.log('pink');
var areas = posts.map(function(post,i) {
	return post.area;
});
console.log(_.uniq(areas));
				var filtered = posts.filter(function(el){
					return el.price >= 0
					&& el.price <= 200000
				});
				return {listings:filtered, order:orderStatus};
	}
	if (filterStatus === false) {
				return {listings:posts, order: orderStatus};
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
	handleOrder = order => {
		this.props.dispatch(selectOrder(order))
	}
  handleRefreshClick = e => {
    e.preventDefault()
    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    //dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated, imagesisFetching, imageslastUpdated, images } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
			<Header />
						<div>
						        <Picker value={selectedReddit}
					                onChange={this.handleChange}
					                options={[ 'listings_residential', 'listings_commercial','listings_land', 'listings_multi_family' ]} />
													<Toggle
																label="Filter"
																style={{width:'256px'}}
																onToggle={(isInputChecked) => this.props.dispatch(toggleFilter())}
													/>
													<OrderPicker onChange={this.handleOrder.bind(this)}/>
													{lastUpdated &&
														<span>
															Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
															{' '}
														</span>

													}
													<p>

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
    posts : sortPosts(filterPosts(posts,state.filterStatus,state.sortStatus.order)),
    isFetching,
    lastUpdated,
		imagesisFetching,
		imageslastUpdated,
		images,
  }
}

export default connect(mapStateToProps)(App)
