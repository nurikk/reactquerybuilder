import SelectField from './SelectField';

class Combinator extends SelectField {
  defaultOptions = [
    {name: 'and', label: 'AND'},
    {name: 'or', label: 'OR'}
  ]
}

export default Combinator;