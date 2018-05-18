import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Combinator } from './controls';
import Rule from './Rule';

import { Icon } from 'antd';
import { Row, Col } from 'antd';

import './tree.scss';

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
    const {rule, onChange, id} = this.props;
    rule.rules.push(newRuleGroup());
    onChange(rule, id);
  }
  addNewRule = () => {
    const {rule, onChange, id} = this.props;
    rule.rules.push(newRule());
    onChange(rule, id);
  }

  isGroup(rule) {
    return rule.combinator && rule.rules;
  }
  onRuleChange = (type, value, ruleId) => {
    const {rule, onChange, id} = this.props;

    switch(type) {
    case 'remove':
      rule.rules.splice(ruleId, 1);
      break;

    default:
      rule.rules[ruleId][type] = value;
      break;
    }
    onChange(rule, id);
  }
  onGroupChange = (group, groupId) => {
    const {rule, id, onChange} = this.props;
    rule.rules[groupId] = group;
    onChange(rule, id);
  }
  onCombinatorChange = (value) => {
    const {rule, id, onChange} = this.props;
    rule.combinator = value;
    onChange(rule, id);
  }
  removeGroup = (groupId) => {
    const {rule, id, onChange} = this.props;
    rule.rules.splice(groupId, 1);
    onChange(rule, id);
  }
  render(){
    const {rule, id, onRemoveGroup} = this.props;

    return (

      <div className="wrapper">
        <span className="label">
          <Combinator defaultValue={rule.combinator} onChange={this.onCombinatorChange}/>
          {id !== 0 ? <Icon onClick={ ()=>onRemoveGroup(id)} type="minus-circle" style={{color: '#FF0000', cursor: 'pointer', marginLeft: 10}} /> : ''}
        </span>
        <div className="branch">
          {
            rule.rules.map((subRule, idx) => {
              return (
                <div className="entry" key={idx}>
                  {
                    this.isGroup(subRule) ?
                      (<RuleGroup onRemoveGroup={this.removeGroup} onChange={this.onGroupChange} id={idx} rule={subRule}/>)
                      :
                      (<Rule id={idx} onChange={this.onRuleChange} key={idx} rule={subRule}/>)
                  }
                </div> );
            }, this)
          }
          <div className={'entry ' + (rule.rules.length === 0 ? 'sole' : ' ')}>
            <Row gutter={10} style={{paddingTop: 10, paddingLeft: 10}}>
              <Col span={3}>
                <Icon type="plus-circle" style={{color: '#008000'}} /> <a onClick={this.addNewRule}>Rule</a>
              </Col>
              <Col span={3}>
                <Icon type="plus-circle" style={{color: '#008000'}} /> <a onClick={this.addRuleGroup}>Group</a>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

RuleGroup.propTypes = {
  rule: PropTypes.shape({
    combinator: PropTypes.string,
    rules: PropTypes.array
  }),
  id: PropTypes.number,
  onRemoveGroup: PropTypes.func,
  onChange: PropTypes.func
};

RuleGroup.defaultProps = {
  rule: newRuleGroup(),
  id: 0
};

export {RuleGroup};