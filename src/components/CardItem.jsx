import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div data-testid="product">
        <p>
          { item.title }
        </p>
        <img src={ item.thumbnail } alt={ item.title } />
        <p>
          { item.price }
        </p>
        <div>
          <Link
            to={ `/product-detail/${item.id}` }
            data-testid="product-detail-link"
          >
            Link
          </Link>
        </div>
      </div>
      // link react para product
    );
  }
}

CardItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
};

export default CardItem;
