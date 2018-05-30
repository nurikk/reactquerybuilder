import { Field, Operator, Value, Range, InField } from './controls';
class DefaultRule {
  label = 'DEFAULT RULE'
  fieldComponent = Field
  valueComponent = Value
  operatorComponent = Operator
}
class EQUALS extends DefaultRule {
  label = 'EQUALS'
}

class NOTEQUAL extends EQUALS {
  label = 'NOTEQUAL'
}

class RLIKE extends EQUALS {
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
}

class NOTEMPTY extends DefaultRule {
  label = 'NOTEMPTY'
  valueComponent = null
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