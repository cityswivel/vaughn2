import React, { Component } from 'react';
import { connect } from 'react-redux';
var _ = require('lodash');

class CitySelect extends Component {
  render () {
    const {areas} = this.props;
    var list = areas.map(function(item,i){
      return (
        <option>{_.startCase(_.toLower(item.replace(/ *\([^)]*\) */g, "")))}</option>
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
