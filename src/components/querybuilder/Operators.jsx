import Field from './controls/Field';
import Operator from './controls/Operator';
import Value from './controls/Value';
import Range, {convertRangeValue, rangeToString} from './controls/Range';
import InField, { inToString } from './controls/InField';

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
  convert = (expect, from) => {
    switch (from) {
    case Range:
      expect.value = inToString([ ...new Set(convertRangeValue(expect.value).slice(1, 3)) ]);
      break;

    default:
      break;
    }
    return expect;
  }
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
