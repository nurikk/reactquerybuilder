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
            'value': '20181012',
            'match-case': true
          }
        },
        {
          'property': 'arg2',
          'meta-operator': 'RANGE',
          'expect': {
            'value': '[1,10)',
            'match-case': true
          }
        },
        {
          'property': 'arg3',
          'meta-operator': 'IN',
          'expect': {
            'value': '[foo,bar,baz]',
            'match-case': true
          }
        },
        {
          'property': 'arg4',
          'meta-operator': 'NOTEQUAL',
          'expect': {
            'value': 'bar'
          }
        },
        {
          'property': 'arg5',
          'meta-operator': 'CONTAINS',
          'expect': {
            'value': 'foo'
          }
        },
        {
          'property': 'arg6',
          'meta-operator': 'RLIKE',
          'expect': {
            'value': '^f.*r$'
          }
        },
        {
          'property': 'arg7',
          'meta-operator': 'NOTEMPTY'
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
                'value': '20181012',
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
