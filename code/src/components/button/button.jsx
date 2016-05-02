import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, className, text, triggerHandler} = this.props;
    const completeClass = classNames('button', className);

    return (
      <button className={completeClass} onClick={triggerHandler}>
        {text ? <span>{text}</span> : null}
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  triggerHandler: PropTypes.func.isRequired,
  text: PropTypes.string
};
