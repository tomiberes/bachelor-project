import {Map} from 'immutable';

export default function combineReducers(reducers) {
  // Single application state atom representend as an Immutable.js Map
  return (state = Map(), action) => {
    // Create mutable (transient) copy of a collection and apply batch of mutations
    return state.withMutations(transientState => {
      Object.keys(reducers).reduce((state, key) => {
        const reducer = reducers[key];

        return state.set(key, reducer(state.get(key), action));
      }, transientState);
    });
  };
}
