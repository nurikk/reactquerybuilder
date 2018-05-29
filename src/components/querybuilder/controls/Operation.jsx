import { SelectField } from './SelectField';

class Operator extends SelectField {
}

Operator.defaultProps = {
  operators: [
    { name: 'IN', label: 'IN' },
    { name: 'RANGE', label: 'RANGE' },
    { name: 'EQUALS', label: 'EQUALS' }
  ]
};
export { Operator };