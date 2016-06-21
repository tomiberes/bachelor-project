import React, {Component} from 'react';

import Presentation from '../presentation/presentation';

// Application root
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Presentation />
      </div>
    );
  }
}
