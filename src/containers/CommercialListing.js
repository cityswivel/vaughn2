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
this.getListing(this.props.match.params.number);
}
findSource(mls) {

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
getListing(mls) {
	fetch('http://jasonseck.com:1337/single_listing?key=jasonseck&listing_type=listings_commercial&mls=' + mls)
		.then(response => {
			if (!response.ok) {
				throw Error("Network request failed")
			}
			return response
			})
				.then(e => e.json())
				.then(e => {
					this.setState ({
						data : e,
						dataLoading : false,
					})
				})

};
	render() {
		if (this.state.imagesLoading || this.state.dataLoading) {
			return(<p>loading...</p>)
		}
		console.log(this.state.data);
		const {
			description,
			price,
			area,
			agent,
			bedrooms,
			fullbaths,
			address,
			city,
			zip,

		} = this.state.data[0];
		const image_list = this.state.images.map(function(image,i){
			return (
				<img src={image.link}/>
			)
		})
		return(
			<div style={styles.container}>
			<p>commercial listingview{this.props.match.params.number}</p>
			<p>{description}</p>
			<p>{price}</p>
			<p>{area}</p>
			<p>Bedrooms: {bedrooms}</p>
			<p>Bathrooms: {fullbaths}</p>
			<p>{address}, {city}, {zip}</p>
			<p>Listed by: {agent}</p>
			{image_list}
			</div>
		)
	}


}

export default ListingView;
//export default connect (mapStatetoProps,mapDispatchtoProps)(Residential);
