import React, { Component } from 'react';
import { connect } from 'react-redux';

var _ = require('lodash');

class TopNav extends Component {
componentDidMount() {
	console.log(this.props);
}

	render() {

		return(
			<div style={styles.parent}>
				<div style={styles.nav_left}><img src="/images/logo_cropped.png" width="75"/></div>
				<div style={styles.nav_right}>
					<div style={styles.nav_item}><a style={styles.nav_link} href="/">Home</a></div>
					<div style={styles.nav_item}><a style={styles.nav_link} href="listings">Search Listings</a></div>
					<div style={styles.nav_item}><a style={styles.nav_link} href="listings">About</a></div>
					<div style={styles.nav_item}><a style={styles.nav_link} href="listings">Twitter</a></div>
				</div>
			</div>
		)
	}


}
const styles = {
	parent : {
		display: 'flex',
		alignItems:'center',
		padding:'15px',
		borderTop:'1px solid #dedede',
		borerBottom:'1px solid #dedede',
	},
	nav_left: {

	},
	nav_right: {
		flexGrow: 1,
		display:'flex',
		alignItems: 'center',
		justifyContent:'center',
	},
	nav_item : {
		marginLeft:'15px',
		marginRight:'15px',
	},
	nav_link : {
		textDecoration: 'none',
	},
	top_container : {
		flex:1,
	}
}

export default TopNav;
//export default connect (mapStatetoProps,mapDispatchtoProps)(Residential);
