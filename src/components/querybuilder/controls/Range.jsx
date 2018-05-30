import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Value } from './Value';
import { Toggle } from './Toggle';
import { Input, Col } from 'antd';

const InputGroup = Input.Group;

const rangeRegex = /^(\[|\()(\S+)(\]|\))$/;
const convertRangeValue = (value) => {
  const match = rangeRegex.exec(value);
  if (match) {
    const [_unused, leftBoudary, values, rightBoundary] = match; // eslint-disable-line no-unused-vars
    const vals = values.split(',')
      .filter(v => v)
      .filter(v => /\d+/.test(v))
      .map(v => parseInt(v, 10))
      .sort((a, b) => a - b);
    const [leftValue=0, ...rightValues] = vals;
    const rightValue = rightValues.pop() || 0;
    return [leftBoudary, leftValue, rightValue, rightBoundary];
  } else {
    return ['[', 0, 0, ']'];
  }
};
export { convertRangeValue };
const rangeToString = ([leftBoudary, leftValue, rightValue, rightBoundary]) => `${leftBoudary}${leftValue},${rightValue}${rightBoundary}`;
export { rangeToString };
class Range extends Component {
  onChange = (side, newValue) => {
    const { defaultValue, onChange } = this.props;
    let currentValue = convertRangeValue(defaultValue.value);

    currentValue[side] = newValue.value;
    const [leftBoudary, leftValue, rightValue, rightBoundary] = currentValue; // eslint-disable-line no-unused-vars
    defaultValue.value = rangeToString(currentValue);
    onChange(defaultValue);
  }

  render() {
    const { defaultValue: { value } } = this.props;

    const [leftBoudary, leftValue, rightValue, rightBoundary] = convertRangeValue(value);

    return (<InputGroup>
      <Col span={4}>
        <Toggle values={['[', '(']} onChange={this.onChange.bind(this, 0)} defaultValue={leftBoudary}/>
      </Col>
      <Col span={8}>
        <Value max={rightValue} type="number" onChange={this.onChange.bind(this, 1)} defaultValue={{ value: leftValue }}/>
      </Col>

      <Col span={8}>
        <Value min={leftValue} type="number" onChange={this.onChange.bind(this, 2)} defaultValue={{ value: rightValue }}/>
      </Col>
      <Col span={4}>
        <Toggle values={[']', ')']} onChange={this.onChange.bind(this, 3)} defaultValue={rightBoundary}/>
      </Col>
    </InputGroup>);
  }
}

Range.propTypes = {
  defaultValue: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  }),
  onChange: PropTypes.func
};

Range.defaultProps = {
  defaultValue: {
    value: ['[', 0, 0, ']']
  }
};


export { Range };