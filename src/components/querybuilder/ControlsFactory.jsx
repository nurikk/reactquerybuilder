import React from 'react';
import { Field, Operator, Value, Range, InField } from './controls';

import { Col } from 'antd';

const ControlsFactory = (rule, eventHandlers) => {
  const { 'meta-operator': operator, 'property': field, 'expect': value } = rule;
  const {
    onFieldChange,
    onOperatorChange,
    onValueChange
  } = eventHandlers;

  let fieldComponent = <Col span={2}><Field name={field} onChange={onFieldChange} defaultValue={field}/></Col>;
  let operatorCompoment = <Col span={2}><Operator placeholder="select operator" onChange={onOperatorChange} defaultValue={operator}/></Col>;
  let valueComponent = null;

  switch (operator) {
  case 'NOTEMPTY':
    valueComponent = null;
    break;

  case 'RANGE':
    valueComponent = <Col span={6}><Range onChange={onValueChange} defaultValue={value}/></Col>;
    break;
  case 'IN':
    valueComponent = <Col span={6}><InField onChange={onValueChange} defaultValue={value}/></Col>;
    break;
  default:
    valueComponent = <Col span={4}><Value onChange={onValueChange} defaultValue={value}/></Col>;
    break;
  }

  return {
    fieldComponent, operatorCompoment, valueComponent
  };
};

export { ControlsFactory };
