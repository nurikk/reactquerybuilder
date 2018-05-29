import { SelectField } from './SelectField';

class Operator extends SelectField {
}

Operator.defaultProps = {
  operators: [
    { name: 'IN', label: 'IN' },
    { name: 'RANGE', label: 'RANGE' },
    { name: 'EQUALS', label: 'EQUALS' },
    { name: 'NOTEQUAL', label: 'NOTEQUAL' },
    { name: 'CONTAINS', label: 'CONTAINS' },
    { name: 'NOTEMPTY', label: 'NOTEMPTY' },
    { name: 'RLIKE', label: 'RLIKE' },
  ]
};
export { Operator };