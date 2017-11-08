import React, { Component } from 'react';
import { connect } from 'react-redux';

var _ = require('lodash');

class TopNav extends Component {
componentDidMount() {
	console.log(this.props);
}

	render() {

		return(
			<div style={styles.nav_container}>
				<div>Vaughn Dearing Real Estate</div>
			</div>
		)
	}


}
const styles = {
	nav_container : {
		width:'100%',
		textAlign: 'center',
		paddingTop:'15px',
		paddingBottom:'15px',
	}
}

export default TopNav;
//export default connect (mapStatetoProps,mapDispatchtoProps)(Residential);
