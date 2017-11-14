import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit, toggleFilter, selectOrder, updateFilter } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Header from '../components/Header'
import FilterForm from '../components/Form'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import ScrollUpButton from "react-scroll-up-button";
import OrderPicker from '../components/OrderPicker';
var _ = require('lodash');

const styles = {
	container_style : {
		width:'100%',
		maxWidth:'1200px',
		margin:'auto'
	},
	loader : {
		position:'relative',
		height:'200px',
		textAlign:'center',

	},
	indicator : {
	}
}
function sortPosts(listings) {
var sorted ='';
	switch(listings.order) {
		case 'asc':
			sorted = _.orderBy(listings.listings, 'price','asc');
			break;
		case 'desc':
			sorted = _.orderBy(listings.listings, 'price','desc');
			break;
		case 'newold' :
			sorted = _.orderBy(listings.listings, 'mls','desc');
			break;
		case 'oldnew' :
			sorted = _.orderBy(listings.listings, 'mls','asc');
			break;
		default:
			sorted = _.orderBy(listings.listings, 'price','asc');
	}

	return sorted;
}
function filterPosts(posts,filterStatus,orderStatus,listing_type) {
	if (filterStatus.filter === true) {
				switch(listing_type) {
					case 'listings_residential':
						var filtered = posts.filter(function(el){
							return el.price >= (filterStatus.criteria.min_price ? filterStatus.criteria.min_price : null)
							&& el.price <= (filterStatus.criteria.max_price ? filterStatus.criteria.max_price : '999999999')
							&& el.bedrooms >= (filterStatus.criteria.beds ? filterStatus.criteria.beds : null)
							&& el.fullbaths >= (filterStatus.criteria.baths ? filterStatus.criteria.baths : null)
						});
						break;
					case 'listings_commercial':
						var filtered = posts.filter(function(el){
							return el.price >= (filterStatus.criteria.min_price ? filterStatus.criteria.min_price : null)
							&& el.price <= (filterStatus.criteria.max_price ? filterStatus.criteria.max_price : '999999999')
						});
						break;
					case 'listings_land':
						var filtered = posts.filter(function(el){
							return el.price >= (filterStatus.criteria.min_price ? filterStatus.criteria.min_price : null)
							&& el.price <= (filterStatus.criteria.max_price ? filterStatus.criteria.max_price : '999999999')
						});
						break;
					case 'listings_multi_family':
						var filtered = posts.filter(function(el){
							return el.price >= (filterStatus.criteria.min_price ? filterStatus.criteria.min_price : null)
							&& el.price <= (filterStatus.criteria.max_price ? filterStatus.criteria.max_price : '999999999')
						});
						break;
			}
				return {listings:filtered, order:orderStatus};
	}
	if (filterStatus.filter === false) {
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
	handleFilterUpdate = (filter,action) => {
		this.props.dispatch(updateFilter(filter))
	}

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated, imagesisFetching, imageslastUpdated, images } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
									<div style={styles.container_style}>
						        <Picker value={selectedReddit}
					                onChange={this.handleChange}
					                options={[ 'listings_residential', 'listings_commercial','listings_land', 'listings_multi_family' ]} />
													<FilterForm onChange={this.handleFilterUpdate.bind(this)}/>
													<div>{posts.length ? posts.length + ' listings returned' : null}</div>
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
									          ? (isFetching ? <div style={styles.loader}><RefreshIndicator style={styles.indicator} size={40} left={10} top={0} status="loading"  /></div> : <h2>No Listings Found.</h2>)
									          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
									              <Posts posts={posts} images={images} mylink={selectedReddit} />
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
    posts : sortPosts(filterPosts(posts,state.filterStatus,state.sortStatus.order,selectedReddit)),
    isFetching,
    lastUpdated,
		imagesisFetching,
		imageslastUpdated,
		images,
  }
}

export default connect(mapStateToProps)(App)
