import {Component, createElement} from 'react';
import configureStore from './configure_store';

const store = configureStore();

// Connect React component to redux store by subscribing to changes
// https://github.com/reactjs/react-redux/issues/60
export function connectReactComponent(component, fn) {
  return class Connect extends Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this.setState(fn(store.getState()));
    }

    componentDidMount() {
      this._unsubscribe = store.subscribe(() => {
        this.setState(fn(store.getState()));
      });
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextState !== this.state; // TODO: simple as this?
    }

    componentWillUnmount() {
      this._unsubscribe();
    }

    render() {
      return createElement(component, Object.assign(this.state, this.props));
    }
  };
}

export default store;
