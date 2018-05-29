import { SelectField } from './SelectField';

class Combinator extends SelectField {
}
Combinator.defaultProps = {
  operators: [
    { name: 'AND', label: 'AND' },
    { name: 'OR', label: 'OR' }
  ]
};

export { Combinator };