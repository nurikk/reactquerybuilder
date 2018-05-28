import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RuleGroup, newRuleGroup } from './RuleGroup';


class QueryBuilder extends Component {
  constructor(props) {
    super(props);
    const {query} = this.props;
    this.state = {query};
  }
  onChange = (query) => {
    const {onChange} = this.props;
    this.setState({query});
    onChange(query);
  }
  onRemoveGroup = (a, b) => {
    const {onChange} = this.props;
    const query = {
      combinator: 'and',
      rules: [
      ]
    };
    this.setState({query});
    onChange({query});
  }
  render() {
    const { query } = this.state;

    return (<RuleGroup onRemoveGroup={this.onRemoveGroup} onChange={this.onChange} rule={query} />);
  }
}

QueryBuilder.propTypes = {
  query: PropTypes.shape({
    combinator: PropTypes.string,
    rules: PropTypes.array
  }),
  onChange: PropTypes.func,
  rule: PropTypes.shape({
    combinator: PropTypes.string,
    rules: PropTypes.array
  })
};

QueryBuilder.defaultProps = {
  query: newRuleGroup(),
  onChange: () => {}
};
export {QueryBuilder};