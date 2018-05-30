import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber } from 'antd';


class Value extends Component {
  handleFieldChange = (event) => {
    const { defaultValue, onChange } = this.props;
    if (typeof event === 'object' && event.target) {
      let { value } = event.target;
      defaultValue.value = value;
    } else {
      defaultValue.value = event;
    }
    onChange(defaultValue);
  }

  render(){
    const { defaultValue, type, ...props } = this.props;
    const types = {
      'string': Input,
      'number': InputNumber
    };
    const InputElement = types[type];
    return (
      <InputElement placeholder="enter value" defaultValue={defaultValue.value} {...props} onChange={this.handleFieldChange}/>
    );
  }
}

Value.propTypes = {
  type: PropTypes.oneOf(['string', 'number']),
  onChange: PropTypes.func,
  defaultValue: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};

Value.defaultProps = {
  type: 'string',
  defaultValue: {
    value: ''
  }
};
export { Value };