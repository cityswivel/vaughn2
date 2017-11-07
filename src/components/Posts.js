import React,  { Component }  from 'react'
import PropTypes from 'prop-types'
import MLSImage from './MLSImage';
import { connect } from 'react-redux';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import LazyLoad from 'react-lazyload';
var numeral = require('numeral');
var _ = require('lodash');

class Posts extends Component {
render () {
const {posts, images, isFetching} = this.props;
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
console.log(this.props);
console.log(isEmpty);
	if (this.props.images.isFetching == true) {
		return (<p>still loading images</p>);
	}
	if (!this.props.images.isFetching) {
		 var listy = posts.map(function(post,i){

			var image_link = _.find(images,{'mls':post.mls});
				return (
			<LazyLoad height={200}>
				<li className="listing_li" key={i}>
				{ isEmpty
					? (
						<div>
						<div style={style.container}>
						<RefreshIndicator size={40} left={10} top={0} status="loading" style={style.refresh} />
						</div>
						<div style={style.container}><span style={style.refresh_test}>images loading...</span></div>
						</div>
				) : (
					<div style={{borderRadius:'5px',width:'100%',paddingTop:'80%',background:'url('+post.link+')',backgroundSize:'cover',backgroundPosition:'center',position:'relative'}}>
					<div style={style.price}>${numeral(post.price).format(0,0)}</div>
					</div>

				)
				}
				<span style={{fontWeight:'bold'}}>{post.mls}</span><br/>
				<span style={{fontSize:'12px'}}>${numeral(post.price).format(0,0)}</span>
				<div style={{fontSize:'12px'}}>{post.area}</div>
				<div style={{fontSize:'14px'}}>Listing # {i}</div>
				<div style={{fontSize:'10px',maxHeight:'100px',overflow:'hidden'}}>{post.description}</div>
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
