import React, { Component } from 'react';

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
		<img src={this.props.image} alt="mls images"/>
	)
}
}

export default MLSImage;
//export default ResCard;
