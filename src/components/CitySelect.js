import React, { Component } from 'react';
import { connect } from 'react-redux';

class CitySelect extends Component {
  render () {
    const {areas} = this.props;
    var list = areas.map(function(item,i){
      return (
        <option>{item}</option>
      )
    })
    return (
      <div>
      <p>CitySelect</p>
      <select>{list}</select>
      </div>
    )
  }
}

export default CitySelect;
