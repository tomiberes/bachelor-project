import React, {Component} from 'react';

import ItemListHistory from '../item_list_history/item_list_histoty';

// Application root
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <ItemListHistory />
      </div>
    );
  }
}
