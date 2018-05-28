import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';
import {Icon} from 'antd';

import {Field, Operator, Value} from './controls';
import {getId, getParent} from './tools';

class Rule extends Component {

  handleFieldChange = (value) => {
    const {onChange, path} = this.props;
    onChange('field', value, getId(path));
  }

  handleValueChange = (value) => {
    const {onChange, path} = this.props;
    onChange('value', value, getId(path));
  }
  handleOperatorChange = (value) => {
    const {onChange, path} = this.props;
    onChange('operator', value, getId(path));
  }
  handleRemoveRule = () => {
    const {onRemoveRule, path} = this.props;
    onRemoveRule(getId(path), getParent(path));
  }
  render(){
    const {rule} = this.props;
    // const removeEl = !isRootElement(path) ? () : null;
    return (
      <Row gutter={10} style={{width: 400, paddingTop: 10}}>
        <Col span={7}>
          <Field onChange={this.handleFieldChange} defaultValue={rule.field}/>
        </Col>
        <Col span={7}>
          <Operator onChange={this.handleOperatorChange} defaultValue={rule.operator}/>
        </Col>
        <Col span={7}>
          <Value onChange={this.handleValueChange} defaultValue={rule.value}/>
        </Col>
        <Col span={3}>
          <Icon onClick={this.handleRemoveRule} type="minus-circle" style={{color: '#FF0000', cursor: 'pointer'}} />
        </Col>
      </Row>
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
    value: PropTypes.string
  }),
};
export default Rule;