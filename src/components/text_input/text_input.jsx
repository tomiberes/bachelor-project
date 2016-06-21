import React, {Component, findDOMNode, PropTypes} from 'react';
import classNames from 'classnames';

const baseClass = 'text-input';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
      focused: false
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  focus() {
    findDOMNode(this.refs.input).focus();
  }

  getValue() {
    return this.state.value;
  }

  setValue(value) {
    this.setState({value});
  }

  handleFocus(ev) {
    this.setState({focused: true});
  }

  handleBlur(ev) {
    this.setState({focused: false});
  }

  handleInput(ev) {
    this.setState({value: ev.target.value});
  }

  render() {
    const {className, label} = this.props;
    const {focused, value} = this.state;
    const isSelected = focused || value.length > 0;
    const completeClass = classNames(baseClass, className, {
      [`${baseClass}--selected`]: isSelected
    });

    return (
      <form className={completeClass}>
        <input
          type="text"
          ref="input"
          value={value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleInput}
        />
        {label ? <label><span>{label}</span></label> : null}
      </form>
    );
  }
}

TextInput.propTypes = {
  value: PropTypes.string
};
