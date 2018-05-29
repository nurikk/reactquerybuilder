import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Combinator } from './controls';
import { Rule } from './Rule';
import { makePath, getId } from './tools';

import { Icon } from 'antd';
import { Row, Col } from 'antd';

import './tree.less';

const newRule = () => {
  return  {
    'property': '',
    'expect': {
      'value': '',
      'match-case': true
    },
    'meta-operator': ''
  };
};

const newRuleGroup = () => {
  return {
    'logic-operator': 'AND',
    'meta-rules': [
      newRule()
    ]
  };
};
export { newRuleGroup };

class RuleGroup extends Component {

  addRuleGroup = () => {
    const { rule, onChange, path } = this.props;
    let { 'sub-trees':trees=[] } = rule;
    trees.push(newRuleGroup());
    rule['sub-trees'] = trees;
    onChange(rule, getId(path));

  }
  addNewRule = () => {
    const { rule, onChange, path } = this.props;
    let { 'meta-rules':rules=[] } = rule;
    rules.push(newRule());
    rule['meta-rules'] = rules;
    onChange(rule, getId(path));
  }

  onRuleChange = (changedRule, ruleId) => {
    const { rule, onChange, path } = this.props;

    rule['meta-rules'][ruleId] = changedRule;
    onChange(rule, getId(path));
  }
  removeRule = (ruleId, parentId) => {
    const { rule, onChange, path, onRemoveGroup } = this.props;
    // debugger
    rule['meta-rules'].splice(ruleId, 1);
    if (rule['meta-rules'].length === 0) {
      onRemoveGroup(parentId);
    } else {
      onChange(rule, getId(path));
    }

  }
  onGroupChange = (group, groupId) => {
    const { rule, path, onChange } = this.props;
    rule['sub-trees'][groupId] = group;
    onChange(rule, getId(path));
  }

  removeGroup = (groupId) => {
    const { rule, path, onChange } = this.props;
    rule['sub-trees'].splice(groupId, 1);
    onChange(rule, getId(path));
  }

  onCombinatorChange = (value) => {
    const { rule, path, onChange } = this.props;
    rule['logic-operator'] = value;
    onChange(rule, getId(path));
  }

  render(){
    const { rule, path, onRemoveGroup } = this.props;
    const id = getId(path);
    const trees = (rule['sub-trees'] || []).map((subRule, idx) => {
      return (
        <div className="entry" key={idx}>
          <RuleGroup path={ makePath(idx, path) } onRemoveGroup={this.removeGroup} onChange={this.onGroupChange} id={idx} rule={subRule}/>
        </div>);
    }, this);

    const rules = (rule['meta-rules'] || []).map((subRule, idx) => {
      return (
        <div className="entry" key={idx}>
          <Rule path={ makePath(idx, path) } onChange={this.onRuleChange} onRemoveRule={this.removeRule} key={idx} rule={subRule}/>
        </div>);
    }, this);

    const sole = trees.length + rules.length === 0;
    return (

      <div className="wrapper">
        <span className="label">
          <Combinator defaultValue={rule['logic-operator']} onChange={this.onCombinatorChange}/>
          <Icon style={{ marginLeft: 8, color: '#FF0000' }} onClick={ ()=>onRemoveGroup(id)} type="minus-circle"/>
        </span>
        <div className="branch">
          {trees}
          {rules}
          <div className={'controls entry' + (sole ? ' sole' : '')}>
            <Row>
              <Col span={3}>
                <a onClick={this.addNewRule}><Icon type="plus-circle"/> Rule</a>
              </Col>
              <Col span={3}>
                <a onClick={this.addRuleGroup}><Icon type="plus-circle"/> Group</a>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

RuleGroup.propTypes = {
  path: PropTypes.arrayOf(PropTypes.number),
  rule: PropTypes.shape({
    combinator: PropTypes.string,
    rules: PropTypes.array
  }),
  onRemoveGroup: PropTypes.func,
  onChange: PropTypes.func
};

RuleGroup.defaultProps = {
  rule: newRuleGroup(),
  path: [0]
};

export { RuleGroup };