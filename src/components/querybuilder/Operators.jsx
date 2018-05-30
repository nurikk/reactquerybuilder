import { Field, Operator, Value, Range, InField, convertRangeValue, rangeToString } from './controls';
class DefaultRule {
  defaults = {
    'match-case': true
  }
  label = 'DEFAULT RULE'
  fieldComponent = Field
  valueComponent = Value
  operatorComponent = Operator

  convert = (expect, from) => { // eslint-disable-line no-unused-vars
    return expect;
  }
}
class EQUALS extends DefaultRule {
  label = 'EQUALS'
}

class NOTEQUAL extends DefaultRule {
  label = 'NOTEQUAL'
}

class RLIKE extends DefaultRule {
  label = 'RLIKE'
}

class CONTAINS extends DefaultRule {
  label = 'CONTAINS'
}

class IN extends DefaultRule {
  label = 'IN'
  valueComponent = InField
}

class RANGE extends DefaultRule {
  label = 'RANGE'
  valueComponent = Range
  convert = (expect, from) => {
    switch (from) {
    case InField:
      expect.value = rangeToString(convertRangeValue(expect.value));
      break;
    default:
      break;
    }
    return expect;
  }
}

class NOTEMPTY extends DefaultRule {
  label = 'NOTEMPTY'
  valueComponent = null
  convert = (expect) => {
    delete expect.value;
    return expect;
  }
}

const operators = {
  'IN': new IN(),
  'RANGE': new RANGE(),
  'EQUALS': new EQUALS(),
  'NOTEQUAL': new NOTEQUAL(),
  'CONTAINS': new CONTAINS(),
  'NOTEMPTY': new NOTEMPTY(),
  'RLIKE': new RLIKE()
};
export { operators };
export default new DefaultRule();