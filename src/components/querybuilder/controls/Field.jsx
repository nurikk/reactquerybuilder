import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

class Field extends Component {
  handleFieldChange = (event) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  }
  render() {
    const { ...props } = this.props;
    return (
      <Input placeholder="column name" {...props} onChange={this.handleFieldChange}/>
    );
  }
}

Field.propTypes = {
  onChange: PropTypes.func,
};
export default Field;
