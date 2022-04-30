import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { getProductDetail } from '../services/api';

class CardItem extends React.Component {
  render() {
    const { item, onClickColocaCarrinho } = this.props;
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
            Mais detalhes...
          </Link>
          <button
            onClick={ onClickColocaCarrinho } // requisito 8
            type="button"
            data-testid="product-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
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
  onClickColocaCarrinho: PropTypes.func.isRequired,
};

export default CardItem;
