import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Col } from 'antd';
import { Icon } from 'antd';

import { getId, getParent } from './tools';

import { ControlsFactory } from './ControlsFactory';
import { Input } from 'antd';
const InputGroup = Input.Group;
class Rule extends Component {

  handleRemoveRule = () => {
    const { onRemoveRule, path } = this.props;
    onRemoveRule(getId(path), getParent(path));
  }
  onChange = (type, value) => {
    const { onChange, path, rule } = this.props;
    let newRule = Object.assign({}, rule, { [type]: value });
    if (type === 'meta-operator') {
      newRule.expect = { value: '', 'match-case': true };
    }
    onChange(newRule, getId(path));
  };
  render(){
    const { rule, ...rest } = this.props;
    const eventHandlers = {
      onFieldChange: this.onChange.bind(this, 'property'),
      onOperatorChange: this.onChange.bind(this, 'meta-operator'),
      onValueChange: this.onChange.bind(this, 'expect')
    };
    const { fieldComponent, operatorCompoment, valueComponent } = ControlsFactory(rule, eventHandlers);
    return (
      <InputGroup {...rest}>
        {fieldComponent}
        {operatorCompoment}
        {valueComponent}
        <Col span={1} className="controls">
          <Icon onClick={this.handleRemoveRule} type="minus-circle" style={{ color: '#FF0000', cursor: 'pointer' }} />
        </Col>
      </InputGroup>
    );
  }
}
Rule.propTypes = {
  onChange: PropTypes.func,
  onRemoveRule: PropTypes.func,
  path: PropTypes.arrayOf(PropTypes.number),
  rule: PropTypes.shape({
    field: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.array
    ])
  }),
};

export { Rule };