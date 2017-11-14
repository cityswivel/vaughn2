import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from 'material-ui/MenuItem';

const Picker = ({ value, onChange, options }) => (
  <span>
    <h1>{value}</h1>
    <select onChange={e => onChange(e.target.value)}
            value={value}>
            <option value="listings_residential" key="listings_residential">Residential Listings</option>
            <option value="listings_land" key="listings_land">Land Listings</option>
            <option value="listings_commercial" key="listings_commercial">Commercial Listings</option>
            <option value="listings_multi_family" key="listings_multi_family">Multi Family Listings</option>
    </select>
  </span>
)

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
