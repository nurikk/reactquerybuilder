import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Option = Select.Option;


class SelectField extends Component {
  render = () => {
    const { operators, ...props } = this.props;
    return (
      <Select showSearch={true} style={{ width: '100%' }} {...props}>
        {operators.map((operator, idx) => {
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
SelectField.defaultProps = {
  operators: []
};

export default SelectField;
