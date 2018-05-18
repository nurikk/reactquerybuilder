import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const Option = Select.Option;


class SelectField extends Component {
  defaultOptions = []
  getOperators(){
    const {operators} = this.props;
    return operators || this.defaultOptions;
  }
  render(){
    const {...props} = this.props;
    return (
      <Select {...props}  style={{ width: 100 }}>
        {this.getOperators().map((operator, idx) => {
          return (<Option value={operator.name}  key={idx}>{operator.label}</Option>);
        })}
      </Select>
    );
  }
}
SelectField.propTypes = {
  operators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string
    }),
  ),
};
export default SelectField;