import {Map, List} from 'immutable';

import {
  ITEM_ADD,
  ITEM_REMOVE,
  ITEM_CHANGE_UNDO,
  ITEM_CHANGE_REDO,
  ITEM_ERROR
} from '../constants/actions';

export default function items(state = Map({
  current: List(), // List of items
  history: List(), // List of lists of items
  future: List() // List of lists of items
}), action) {
  const {type, payload} = action;
  const current = state.get('current');
  const history = state.get('history');
  const future = state.get('future');

  switch (type) {
    case ITEM_ADD:
      return state.merge({
        history: history.push(current),
        current: current.push(payload),
        future: future.clear()
      });
    case ITEM_REMOVE:
      return state.merge({
        history: history.push(current),
        current: current.butLast(),
        future: future.clear()
      });
    case ITEM_CHANGE_UNDO:
      if (history.size > 0) {
        const previous = history.last();
        const newHistory = history.butLast();

        return state.merge({
          history: newHistory,
          current: previous,
          future: future.unshift(current)
        });
      } else {
        return state;
      }
    case ITEM_CHANGE_REDO:
      if (future.size > 0) {
        const next = future.first();
        const newFuture = future.rest();

        return state.merge({
          history: history.push(current),
          current: next,
          future: newFuture
        });
      } else {
        return state;
      }
    case ITEM_ERROR:
      return state;
    default:
      return state;
  }
}
