import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Combinator } from './controls';
import Rule from './Rule';
import {makePath, getId} from './tools';

import { Icon } from 'antd';
import { Row, Col } from 'antd';

import './tree.less';

const newRule = () => {
  return  {
    'field': '',
    'value': '',
    'operator': ''
  };
};

const newRuleGroup = () => {
  return {
    combinator: 'and',
    rules: [
      newRule()
    ]
  };
};
export { newRuleGroup };

class RuleGroup extends Component {

  addRuleGroup = () => {
    const {rule, onChange, path} = this.props;
    rule.rules.push(newRuleGroup());
    onChange(rule, getId(path));
  }
  addNewRule = () => {
    const {rule, onChange, path} = this.props;
    rule.rules.push(newRule());
    onChange(rule, getId(path));
  }

  isGroup(rule) {
    return rule.combinator && rule.rules;
  }
  onRuleChange = (attr, value, ruleId) => {
    const {rule, onChange, path} = this.props;
    rule.rules[ruleId][attr] = value;
    onChange(rule, getId(path));
  }
  removeRule = (ruleId, parentId) => {
    const {rule, onChange, path, onRemoveGroup} = this.props;
    rule.rules.splice(ruleId, 1);
    if (rule.rules.length === 0) {
      onRemoveGroup(parentId);
    } else {
      onChange(rule, getId(path));
    }

  }
  onGroupChange = (group, groupId) => {
    const {rule, path, onChange} = this.props;
    rule.rules[groupId] = group;
    onChange(rule, getId(path));
  }

  removeGroup = (groupId) => {
    const {rule, path, onChange} = this.props;
    rule.rules.splice(groupId, 1);
    onChange(rule, getId(path));
  }

  onCombinatorChange = (value) => {
    const {rule, path, onChange} = this.props;
    rule.combinator = value;
    onChange(rule, getId(path));
  }
  render(){
    const {rule, path, onRemoveGroup} = this.props;
    const id = getId(path);
    return (

      <div className="wrapper">
        <span className="label">
          <Combinator defaultValue={rule.combinator} onChange={this.onCombinatorChange}/>
          <Icon onClick={ ()=>onRemoveGroup(id)} type="minus-circle" style={{color: '#FF0000', cursor: 'pointer', marginLeft: 10}} />
        </span>
        <div className="branch">
          {
            rule.rules.map((subRule, idx) => {
              return (
                <div className="entry" key={idx}>
                  {
                    this.isGroup(subRule) ?
                      (<RuleGroup path={ makePath(idx, path) } onRemoveGroup={this.removeGroup} onChange={this.onGroupChange} id={idx} rule={subRule}/>)
                      :
                      (<Rule path={ makePath(idx, path) } onChange={this.onRuleChange} onRemoveRule={this.removeRule} key={idx} rule={subRule}/>)
                  }
                </div> );
            }, this)
          }
          <div className={'entry' + (rule.rules.length === 0 ? ' sole' : '')}>
            <Row gutter={10} style={{paddingTop: 10, paddingLeft: 10}}>
              <Col span={3}>
                <a onClick={this.addNewRule}><Icon type="plus-circle" style={{color: '#008000'}} /> Rule</a>
              </Col>
              <Col span={3}>
                <a onClick={this.addRuleGroup}><Icon type="plus-circle" style={{color: '#008000'}} /> Group</a>
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

export {RuleGroup};