import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Input} from 'antd';

class Value extends Component {
  handleFieldChange = (event) => {
    const {onChange} = this.props;
    onChange(event.target.value);
  }
  render(){
    const {...props} = this.props;
    return (
      <Input {...props} onChange={this.handleFieldChange}/>
    );
  }
}

Value.propTypes = {
  onChange: PropTypes.func,
};

export default Value;