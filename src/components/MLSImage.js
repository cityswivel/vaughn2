import React, { Component } from 'react';
const BASE_URL = 'http://jasonseck.com:1337/';
const KEY = 'jasonseck';

class MLSImage extends Component {
	state = {
    loading: true,
    error: false,
    data: [],
  };

componentDidMount() {

}

componentWillReceiveProps(nextProps) {

}
render () {
	return (
		<img src={this.props.image} />
	)
}
}

export default MLSImage;
//export default ResCard;
