import React, { Component } from 'react';


class Footer extends Component {

	render() {

		return(
			<div style={styles.footer_container}>
        <div>@ 2017 Vaughn Dearing Real Estate</div>
			</div>
		)
	}


}
const styles = {
	footer_container : {
		width:'100%',
		textAlign: 'center',
		paddingTop:'15px',
		paddingBottom:'15px',
    height:'200px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
	}
}

export default Footer;
