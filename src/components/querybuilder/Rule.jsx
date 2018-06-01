import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon, Input } from 'antd';

import { getId, getParent } from './tools';
import DefaultRule from './Operators';

import styles from './tree.module.scss';

const InputGroup = Input.Group;


class Rule extends Component {
  getOperatorConfig = (operator) => {
    const { operators } = this.props;
    return operators[operator] || DefaultRule;
  }
  handleRemoveRule = () => {
    const { onRemoveRule, path } = this.props;
    onRemoveRule(getId(path), getParent(path));
  }
  onChange = (type, value) => {
    const { onChange, path, rule } = this.props;
    const currentOperator = this.getOperatorConfig(rule['meta-operator']);
    let newRule = Object.assign({}, rule, { [type]: value });
    const nextOperator = this.getOperatorConfig(newRule['meta-operator']);

    if (currentOperator.valueComponent !== nextOperator.valueComponent) {
      newRule.expect = nextOperator.convert(newRule.expect, currentOperator.valueComponent);
    }

    Object.assign(newRule.expect, nextOperator.defaults);

    onChange(newRule, getId(path));
  };
  render() {
    const { operators, rule, ...rest } = this.props;
    const operatorsList = Object.keys(operators).map(k => { return { name: k, label: operators[k].label }; });
    const { 'meta-operator': operator, 'property': field, 'expect': value } = rule;
    const operatorConfig = this.getOperatorConfig(operator);

    const FieldComponent = operatorConfig['fieldComponent'];
    const ValueComponent = operatorConfig['valueComponent'];
    const OperatorComponent = operatorConfig['operatorComponent'];

    const valueColumn = ValueComponent ? (<Col span={10}><ValueComponent onChange={this.onChange.bind(this, 'expect')} defaultValue={value}/></Col>) : null;
    return (
      <InputGroup {...rest}>
        <Col span={9}><FieldComponent onChange={this.onChange.bind(this, 'property')} defaultValue={field}/></Col>
        <Col span={4}><OperatorComponent operators={operatorsList} onChange={this.onChange.bind(this, 'meta-operator')} defaultValue={operator}/></Col>
        {valueColumn}
        <Col span={1} className={styles.controls}>
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

export default Rule;
