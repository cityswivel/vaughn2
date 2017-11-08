import React, { Component } from 'react';
import { connect } from 'react-redux';
var _ = require('lodash');

const styles = {
	container : {
		width:'100%',
		maxWidth: '1200px',
		margin:'auto',
	}
}


class ListingView extends Component {
	constructor(props) {
    super(props);
    this.state = {
			images: {},
			data: {},
			imagesLoading: true,
			dataLoading: true,
		};
  }

componentDidMount() {

this.getImages(this.props.match.params.number);
console.log('props');
console.log(this.props);
}

getImages(mls) {
	fetch('http://jasonseck.com:1337/images?key=jasonseck&mls=' + mls)
		.then(response => {
			if (!response.ok) {
				throw Error("Network request failed")
			}
			return response
			})
				.then(d => d.json())
				.then(d => {
					this.setState ({
						images : d,
						imagesLoading : false,
					})
				})

};
	render() {
if (this.state.imagesLoading) {
	return(<p>loading...</p>)
}
const image_list = this.state.images.map(function(image,i){
	return (
		<img src={image.link}/>
	)
})
		return(
			<div style={styles.container}>
			<p>listingview{this.props.match.params.number}</p>
			{image_list}
			</div>
		)
	}


}

export default ListingView;
//export default connect (mapStatetoProps,mapDispatchtoProps)(Residential);
