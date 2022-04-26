import React from 'react';
import PropTypes from 'prop-types';

class CardItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <p>
          { item.title }
        </p>
        <img src={ item.thumbnail } alt={ item.title } />
        <p>
          { item.price }
        </p>
      </div>
    );
  }
}

CardItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default CardItem;
