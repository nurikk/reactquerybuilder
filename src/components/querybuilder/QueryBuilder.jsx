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
  render() {
    return (<RuleGroup onChange={this.onChange} rule={this.state.query}/>);
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