import {Map, List} from 'immutable';

import {
  ITEM_ADD,
  ITEM_REMOVE,
  ITEM_CHANGE_UNDO,
  ITEM_CHANGE_REDO,
  ITEM_ERROR
} from '../constants/actions';

export default function items(state = Map({
  current: List(),
  history: List(),
  future: List()
}), action) {
  const data = action.payload ? action.payload : null;

  switch (action.type) {
    case ITEM_ADD: {
      const items = state.get('current').push(data);
      const history = state.get('history');

      return state.merge({
        current: items,
        history: history.push(items)
      });
    }
    case ITEM_REMOVE: {
      const current = state.get('current');
      const index = current.indexOf(data);

      if (index > -1) {
        const items = current.remove(index);
        const history = state.get('history');

        return state.merge({
          current: items,
          history: history.push(items)
        });
      }
      return state;
    }
    case ITEM_CHANGE_UNDO: {
      const history = state.get('history');

      if (history.size > 0) {
        const current = state.get('current');
        const future = state.get('future');

        return state.merge({
          history: history.pop(),
          future: future.push(current),
          current: history.last()
        });
      }
      return state;
    }
    case ITEM_CHANGE_REDO: {
      const history = state.get('history');

      if (history.size > 0) {
        const current = state.get('current');
        const future = state.get('future');

        return state.merge({
          current: future.last(),
          history: history.push(current),
          future: future.pop()
        });
      }
      return state;
    }
    case ITEM_ERROR: {
      // TODO
      return state;
    }
    default:
      return state;
  }
}
