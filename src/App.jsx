import React, { Component } from 'react';
import './App.css';

import { QueryBuilder } from './components/querybuilder';

class App extends Component {
  state = {
    query: {
      combinator: 'and',
      rules: [
        {
          'field': 'ds',
          'value': '20180503',
          'operator': '='
        },
        {
          'field': 'keyvalue(args, \'&\', \'=\', \'pc_i\')',
          'value': '5a543050-2dd0-4401-d2f8-fa746e987316',
          'operator': '='
        },
        {
          'field': 'venture',
          'operator': '=',
          'value': 'SG'
        },
        {
          combinator: 'and',
          rules: [
            {
              'field': 'ds',
              'value': '20180503',
              'operator': '='
            },
            {
              'field': 'keyvalue(args, \'&\', \'=\', \'pc_i\')',
              'value': '5a543050-2dd0-4401-d2f8-fa746e987316',
              'operator': '='
            },
            {
              'field': 'venture',
              'operator': '=',
              'value': 'SG'
            }
          ]
        }
      ]
    }
  }
  onChange = (query) => {
    this.setState({query});
  }

  render() {
    const {query} = this.state;
    return (
      <div className="App">
        <QueryBuilder query={query} onChange={this.onChange}/>
        <pre>{JSON.stringify(query, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
