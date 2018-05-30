import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Option = Select.Option;
const removeBrackets = (str) => str.replace(/^[[|()]([\s\S]*)[\]|)]$/, '$1');
export { removeBrackets };

const convertInValue = (value) => {
  return removeBrackets(value).split(',').filter(n => n);
};
export { convertInValue };

const inToString = (list) => `[${list.join(',')}]`;
export { inToString };
class InField extends Component {
  onChange = (newValues) => {
    const { defaultValue, onChange } = this.props;
    defaultValue.value = inToString(newValues);
    onChange(defaultValue);
  }
  render(){
    const { defaultValue: { value }, ...props } = this.props;
    const values = convertInValue(value);
    return (
      <Select tokenSeparators={[',']} defaultValue={values} mode="tags" style={{ width: '100%' }} {...props} onChange={this.onChange}>
        {values.map((value, idx) => {
          return (<Option value={value} key={idx}>{value}</Option>);
        })}
      </Select>
    );
  }
}

InField.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.shape({
    value: PropTypes.string
  }),
};

InField.defaultProps = {
  defaultValue: {
    value: '[]'
  }
};
export { InField };