import React, { Component } from 'react';
import './App.css';

import QueryBuilder from './components/querybuilder';

class App extends Component {
  state = {

    query: {
      "logic-operator": "AND",
      "meta-rules": [
        {
          "property": "arg1",
          "meta-operator": "IN",
          "expect": {
            "value": "[foo,bar,baz]",
            "match-case": true
          }
        },
        {
          "property": "arg2",
          "expect": {
            "value": "(0,100]",
            "match-case": true
          },
          "meta-operator": "RANGE"
        },
        {
          "property": "arg3",
          "expect": {
            "value": "test",
            "match-case": true
          },
          "meta-operator": "EQUALS"
        },
        {
          "property": "arg4",
          "expect": {
            "value": "baz",
            "match-case": true
          },
          "meta-operator": "NOTEQUAL"
        },
        {
          "property": "arg5",
          "expect": {
            "value": "abc",
            "match-case": true
          },
          "meta-operator": "CONTAINS"
        },
        {
          "property": "arg6",
          "expect": {
            "value": "",
            "match-case": true
          },
          "meta-operator": "NOTEMPTY"
        },
        {
          "property": "arg7",
          "expect": {
            "value": "/\\d+/",
            "match-case": true
          },
          "meta-operator": "RLIKE"
        }
      ],
      "sub-trees": [
        {
          "logic-operator": "AND",
          "meta-rules": [
            {
              "property": "foo",
              "expect": {
                "value": "bar",
                "match-case": true
              },
              "meta-operator": "EQUALS"
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
