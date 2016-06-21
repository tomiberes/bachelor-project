import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, items} = this.props;
    const completeClass = classNames('item-list', className);

    return (
      <ul className={completeClass}>
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.object.isRequired
};
