import React,  { Component }  from 'react'
import { clearFilter } from '../actions'
import { connect } from 'react-redux'
var serialize = require('form-serialize');


class FilterForm extends Component {
handleChange = (filter) => {this.props.onChange(filter);}
clearForm = (form) => {this.props.dispatch(clearFilter());form.reset()}
	render() {
 var form = document.querySelector('#example-form');
		return (
			<div style={{marginTop:'20px',marginBottom:'20px'}}>
			<form id="example-form">
				Min_Price
			    <input type="text" name="min_price" onChange={() => console.log('form change')}/><br/>
					Max_price
					<input type="text" name="max_price" onChange={() => console.log('form change')}/><br/>
					{this.props.selected_listings == 'listings_residential' ?
						<div>
							BedRooms <input type="text" name="beds" onChange={() => console.log("form change")}/><br/>
							BathRooms	<input type="text" name="baths" onChange={() => console.log('form change')}/><br/>
						</div>
						 : null}
						 			</form>
			<button onClick={() => this.handleChange(serialize(form, {hash:true}),'apply')}>apply</button>
			<button onClick={() => this.clearForm(form)}>clear</button>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		selected_listings:state.selectedReddit,
		form_areas : state.postsByReddit.listings_residential
	}
};
export default connect(mapStateToProps)(FilterForm);
