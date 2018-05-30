import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class Toggle extends Component {
  onChange = () => {
    const { defaultValue, values, onChange } = this.props;
    let currentIdx = values.indexOf(defaultValue);
    if (currentIdx >= values.length - 1) {
      currentIdx = 0;
    } else {
      currentIdx ++;
    }
    onChange({ value: values[currentIdx] });
  }
  render() {
    const { defaultValue, values } = this.props;
    return <Button type="primary" onClick={this.onChange}>{defaultValue || values[0]}</Button>;
  }
}

Toggle.propTypes = {
  defaultValue: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string, PropTypes.number),
  onChange: PropTypes.func
};

export { Toggle };