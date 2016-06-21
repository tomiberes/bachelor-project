import React, {Component} from 'react';

import Button from '../button/button';
import ItemList from '../item_list/item_list';
import TextInput from '../text_input/text_input';
import store, {connectReactComponent} from '../../store';
import {
  addItem, removeItem, undoItemChange, redoItemChange
} from '../../actions/item';

const {dispatch} = store;
const storeKey = 'items';

// Proof of concept for undo/redo history
export class ItemHistory extends Component {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
  }

  handleAdd() {
    addItem(dispatch, this.refs.textInput.getValue());
  }

  handleRemove() {
    removeItem(dispatch);
  }

  handleUndo() {
    undoItemChange(dispatch);
  }

  handleRedo() {
    redoItemChange(dispatch);
  }

  render() {
    const {items, initialValue} = this.props;

    return (
      <div className="item-history">
        <TextInput
          value={initialValue || ''}
          ref="textInput"
        />
        <Button triggerHandler={this.handleAdd}>Add</Button>
        <Button triggerHandler={this.handleRemove}>Remove</Button>
        <br></br>
        <Button triggerHandler={this.handleUndo}>Undo</Button>
        <Button triggerHandler={this.handleRedo}>Redo</Button>
        <ItemList items={items.get('current')} />
      </div>
    );
  }
}

export default connectReactComponent(ItemHistory, state => {
  return {[storeKey]: state.get(storeKey)};
});
