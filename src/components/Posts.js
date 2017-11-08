import React,  { Component }  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import LazyLoad from 'react-lazyload';
import MyModal from './MyModal';
import { Link } from 'react-router-dom';
var numeral = require('numeral');
var _ = require('lodash');

class Posts extends Component {
render () {
const {posts, images, isFetching, mylink} = this.props;
const isEmpty = posts.length === 0
const style = {
  container: {
    position: 'relative',
		textAlign: 'center',
		width:'100%',
  },
  refresh: {
		display: 'inline-block',
	    position: 'relative',
  },
	refresh_test: {
		fontSize:'10px',
	},
	images:{
		borderRadius:'5px',
	},
	price : {
		background:'rgba(240,240,240,.7)',
		left:'5px',
		bottom:'5px',
		position:'absolute',
		padding:'4px',
		borderRadius:'4px',
	}
};
	if (this.props.images.isFetching === true) {
		return (<p>still loading images</p>);
	}
	if (!this.props.images.isFetching) {
		 var listy = posts.map(function(post,i){
			var i_style = {
				back_image : {
					backgroundImage:'url('+post.link+')',
					backgroundSize: 'cover',
					backgroundPositionX: 'center',
					backgroundPositionY: 'center',
					backgroundRepeat: 'no-repeat',
					position: 'relative',
					borderRadius:'5px',
					paddingTop:'80%',
				}
			}
				return (
			<LazyLoad height={200} key={i}>
				<li className="listing_li">
				{ isEmpty
					? (
						<div>
						<div style={style.container}>
						<RefreshIndicator size={40} left={10} top={0} status="loading" style={style.refresh} />
						</div>
						<div style={style.container}><span style={style.refresh_test}>images loading...</span></div>
						</div>
				) : (
					<Link to={`/${mylink}/${post.mls}`} post={post}>
					<div style={i_style.back_image}>
					<div style={style.price}>${numeral(post.price).format(0,0)}</div>
					</div>
					</Link>

				)
				}
				<span style={{fontWeight:'bold'}}>{post.mls}</span><br/>
				<span style={{fontSize:'12px'}}>${numeral(post.price).format(0,0)}</span>
				<div style={{fontSize:'12px'}}>{post.area}</div>
				<div style={{fontSize:'12px'}}>Bedrooms: {post.bedrooms}</div>
				<div style={{fontSize:'12px'}}>Bathrooms: {post.fullbaths}</div>
				<div>{mylink}</div>
				<div ><Link to={`/${mylink}/${post.mls}`}>View Listing</Link></div>
				<MyModal
					price={post.price}
					description={post.description}
					image={post.link}
					mls={post.mls}
					bedrooms={post.bedrooms}
				/>
				</li>
				</LazyLoad>
			)
		})
	return (<ul className="listing_ul">{listy}
					</ul>);

}
}


}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
const mapStateToProps = state => {
  const { selectedReddit, postsByReddit } = state

	const {
    isFetching,
    lastUpdated,
    items: images
  } = postsByReddit['all_images'] || {
    Fetching: true,
    items: []
  }
  return {
		isFetching,
		lastUpdated,
		images,
  }
}

export default connect(mapStateToProps)(Posts)

//export default Posts
