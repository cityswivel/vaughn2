import React, { Component } from 'react';
import { connect } from 'react-redux';

var _ = require('lodash');
var my_image = require ('../assets/temp.jpg')
class TopSplash extends Component {
componentDidMount() {
	console.log(this.props);
}

	render() {

		return(
			<div style={styles.backsplash}>
			</div>
		)
	}


}

const styles = {
	backsplash : {
		height:'80vh',
		backgroundImage: 'url(temp.jpg)',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	}
}
export default TopSplash;
//export default connect (mapStatetoProps,mapDispatchtoProps)(Residential);