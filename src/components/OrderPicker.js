import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class OrderPicker extends Component {
	state = {
    value: 'asc',
  };
handleChange = (event, index, value) => {this.setState({value});this.props.onChange(value);}
	render() {
		return(
			<SelectField
			          floatingLabelText="Frequency"
			          value={this.state.value}
			          onChange={this.handleChange}
			        >
			          <MenuItem value='asc' primaryText="Price - Low to High" />
			          <MenuItem value='desc' primaryText="Price - High to Low" />
			          <MenuItem value='oldnew' primaryText="Listing - Old to New" />
			          <MenuItem value='newold' primaryText="Listing - New to Old" />

			        </SelectField>
		);
	}
}

export default OrderPicker;
