import {Map, List} from 'immutable';

import {
  ITEM_ADD,
  ITEM_REMOVE,
  ITEM_CHANGE_UNDO,
  ITEM_CHANGE_REDO,
  ITEM_ERROR
} from '../constants/actions';

export default function history(state = Map({
  list: List(),
  history: List(),
  future: List()
}), action) {
  const data = action.payload ? action.payload : null;

  switch (action.type) {
    case ITEM_ADD: {
      const newList = state.get('list').push(data);
      const history = state.get('history');

      return state.merge({
        list: newList,
        history: history.push(newList)
      });
    }
    case ITEM_REMOVE: {
      const list = state.get('list');
      const index = list.indexOf(data);

      if (index > -1) {
        const newList = list.remove(index);
        const history = state.get('history');

        return state.merge({
          list: newList,
          history: history.push(newList)
        });
      }
      return state;
    }
    case ITEM_CHANGE_UNDO: {
      const history = state.get('history');

      if (history.size > 0) {
        const list = state.get('list');
        const future = state.get('future');

        return state.merge({
          history: history.pop(),
          future: future.push(list),
          list: history.last()
        });
      }
      return state;
    }
    case ITEM_CHANGE_REDO: {
      const history = state.get('history');

      if (history.size > 0) {
        const list = state.get('list');
        const future = state.get('future');

        return state.merge({
          list: future.last(),
          history: history.push(list),
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
