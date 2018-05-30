import React, { Component } from 'react';
import './App.css';

import { QueryBuilder } from './components/querybuilder';

class App extends Component {
  state = {

    query: {
      'logic-operator': 'AND',
      'meta-rules': [
        {
          'property': 'arg1',
          'meta-operator': 'EQUALS',
          'expect': {
            'value': '201810122',
            'match-case': true
          }
        },
        {
          'property': 'arg2',
          'meta-operator': 'RANGE',
          'expect': {
            'value': '[1,11)',
            'match-case': true
          }
        },
        {
          'property': 'arg3',
          'meta-operator': 'IN',
          'expect': {
            'value': '[foo,bar,baz,zab]',
            'match-case': true
          }
        },
        {
          'property': 'arg4',
          'meta-operator': 'NOTEQUAL',
          'expect': {
            'value': 'bar1',
            'match-case': true
          }
        },
        {
          'property': 'arg5',
          'meta-operator': 'CONTAINS',
          'expect': {
            'value': 'fooa',
            'match-case': true
          }
        },
        {
          'property': 'arg6',
          'meta-operator': 'RLIKE',
          'expect': {
            'value': '^2f.*r$',
            'match-case': true
          }
        },
        {
          'property': 'arg7',
          'meta-operator': 'NOTEMPTY',
          'expect': {
            'match-case': true
          }
        }
      ],
      'sub-trees': [
        {
          'logic-operator': 'AND',
          'meta-rules': [
            {
              'property': 'ds',
              'meta-operator': 'EQUALS',
              'expect': {
                'value': '201810122',
                'match-case': true
              }
            }
          ]
        }
      ]
    }
  }
  onChange = (query) => {
    this.setState({ query });
  }

  render() {
    const { query } = this.state;
    return (
      <div className="App">
        <QueryBuilder query={query} onChange={this.onChange} className="qb"/>
        <pre className="code">{JSON.stringify(query, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
