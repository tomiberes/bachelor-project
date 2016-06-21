import {List, Map} from 'immutable';

export default function undoable(reducer, actions = {
  undo: 'UNDO',
  redo: 'REDO'
}) {
  // Return a reducer that handles undo and redo
  return function (state = Map({
    // Call the reducer with empty action to populate the initial state
    current: reducer(undefined, {}), // List of items
    history: List(), // List of lists of items
    future: List() // List of lists of items
  }), action) {
    const current = state.get('current');
    const history = state.get('history');
    const future = state.get('future');

    switch (action.type) {
      case actions.undo: {
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
      }
      case actions.redo: {
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
      }
      default: {
        // Delegate handling the action to the passed reducer
        const newCurrent = reducer(current, action);
        if (current === newCurrent) {
          return state;
        } else {
          return state.merge({
            history: history.push(current),
            current: newCurrent,
            future: future.clear()
          });
        }
      }
    }
  };
}
