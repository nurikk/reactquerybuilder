import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RuleGroup, newRuleGroup } from './RuleGroup';
import { operators } from './Operators';

class QueryBuilder extends Component {
  constructor(props) {
    super(props);
    let { query } = this.props;
    if (typeof query === 'string') {
      try {
        query = JSON.parse(query);
      } catch (e) {
        query = newRuleGroup();
        console.error(e);
      }
    }
    if (Object.keys(query).length === 0) {
      query = newRuleGroup();
    }

    if (typeof query !== 'object') {
      query = newRuleGroup();
    }
    this.state = { query };
  }
  onChange = (query) => {
    const { onChange, query: originalQuery } = this.props;

    this.setState({ query });
    if (typeof originalQuery === 'string') {
      query = JSON.stringify(query);
    }
    onChange(query);
  }
  onRemoveGroup = () => {
    const { onChange, query: originalQuery } = this.props;
    let query = {
      'meta-operator': 'AND',
      'meta-rules': [],
      'sub-trees': []
    };
    this.setState({ query });

    if (typeof originalQuery === 'string') {
      query = JSON.stringify(query);
    }
    onChange({ query });
  }
  render() {
    const { query } = this.state;

    return (<RuleGroup operators={operators} onRemoveGroup={this.onRemoveGroup} onChange={this.onChange} rule={query} />);
  }
}

QueryBuilder.propTypes = {
  query: PropTypes.oneOfType([PropTypes.shape({
    combinator: PropTypes.string,
    rules: PropTypes.array
  }), PropTypes.string]),
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

export default QueryBuilder;
