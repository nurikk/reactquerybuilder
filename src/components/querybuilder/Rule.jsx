import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';
import {Icon} from 'antd';

import {Field, Operator, Value} from './controls';

class Rule extends Component {

  handleFieldChange = (value) => {
    const {onChange, id} = this.props;
    onChange('field', value, id);
  }

  handleValueChange = (value) => {
    const {onChange, id} = this.props;
    onChange('value', value, id);
  }
  handleOperatorChange = (value) => {
    const {onChange, id} = this.props;
    onChange('operator', value, id);
  }
  handleRemoveRule = () => {
    const {onChange, id} = this.props;
    onChange('remove', id);
  }
  render(){
    const {rule} = this.props;
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
  id: PropTypes.number,
  rule: PropTypes.shape({
    field: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.string
  }),
};
export default Rule;