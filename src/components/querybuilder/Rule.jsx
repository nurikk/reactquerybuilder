import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon, Input } from 'antd';

import { getId, getParent } from './tools';
import { default as DefaultRule } from './Operators';

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
      newRule.expect = { value: '' };
    }

    let { expect={} } = newRule;
    expect['match-case'] = true;
    newRule.expect = expect;

    onChange(newRule, getId(path));
  };
  render(){
    const { operators, rule, ...rest } = this.props;
    const operatorsList = Object.keys(operators).map(k => { return { name: k, label: operators[k].label }; });
    const { 'meta-operator': operator, 'property': field, 'expect': value } = rule;
    const operatorConfig = operators[operator] || DefaultRule;

    const FieldComponent = operatorConfig['fieldComponent'];
    const ValueComponent = operatorConfig['valueComponent'];
    const OperatorComponent = operatorConfig['operatorComponent'];

    const valueColumn = ValueComponent ? (<Col span={4}><ValueComponent onChange={this.onChange.bind(this, 'expect')} defaultValue={value}/></Col>) : null;
    return (
      <InputGroup {...rest}>
        <Col span={2}><FieldComponent onChange={this.onChange.bind(this, 'property')} defaultValue={field}/></Col>
        <Col span={2}><OperatorComponent operators={operatorsList} onChange={this.onChange.bind(this, 'meta-operator')} defaultValue={operator}/></Col>
        {valueColumn}
        <Col span={1} className="controls">
          <Icon onClick={this.handleRemoveRule} type="minus-circle" style={{ color: '#FF0000', cursor: 'pointer' }} />
        </Col>
      </InputGroup>
    );
  }
}
Rule.propTypes = {
  operators: PropTypes.object,
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

Rule.defaultProps = {
  operators: {}
};

export { Rule };