import React, { Component } from 'react';
import { connect } from 'react-redux';

var _ = require('lodash');
var my_image = require ('../assets/temp.jpg')
class TopSplash extends Component {
componentDidMount() {
}

	render() {

		return(
			<div style={styles.backsplash}>
				<img style={styles.logo}src="/images/logo_cropped.png"/>
			</div>
		)
	}


}

const styles = {
	backsplash : {
		height:'100vh',
		backgroundImage: 'url(temp.jpg)',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		display:'flex',
		alignItems:'center',
		justifyContent:' center',
	},
	logo : {
		madWidth:'80%',
	}
}
export default TopSplash;
//export default connect (mapStatetoProps,mapDispatchtoProps)(Residential);
