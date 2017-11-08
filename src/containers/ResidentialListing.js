import React, { Component } from 'react';
import { connect } from 'react-redux';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
var _ = require('lodash');

const styles = {
	container : {
		width:'100%',
		maxWidth: '1200px',
		margin:'auto',
		padding:'6px',
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
	fetch('http://jasonseck.com:1337/single_listing?key=jasonseck&listing_type=listings_residential&mls=' + mls)
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

		const image_list: any =  this.state.images.map(function(image,i){
			return (
				{
					original: image.link,
					thumbnail: image.thumb
				}

			)

		});

	function convertUnicode(input) {
  	return input.replace(/[^\x00-\x7F]/g, "");
//		var final = '<p>' + no_uni.split("\n").join('</p><p>') + '</p>';
//		return final;
	};


		console.log(image_list);
		return(
			<div style={styles.container}>
				<div style={{width:'35%',float:'right',padding:'8px',boxSizing:'border-box'}}>
					<p>residential listingview{this.props.match.params.number}</p>
					<p>{price}</p>
					<p>{area}</p>
					<p>Bedrooms: {bedrooms}</p>
					<p>Bathrooms: {fullbaths}</p>
					<p>{address}, {city}, {zip}</p>
					<p>Listed by: {agent}</p>
				</div>
				<div style={{width:'65%',float:'left'}}>
					<div style={{width:'100%',margin:'auto'}}>
						<ImageGallery
							items={image_list}
							useBrowserFullscreen={false}
							showPlayButton={false}
						/>
					</div>
				</div>
				<div style={{width:'100%',clear:'both'}}>
					<p style={{lineHeight:'25px'}}>{convertUnicode(description)}</p>
				</div>
			</div>
		)
	}


}

export default ListingView;
//export default connect (mapStatetoProps,mapDispatchtoProps)(Residential);
