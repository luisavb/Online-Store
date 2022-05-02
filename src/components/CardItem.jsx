import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CardItem.css';
// import { getProductDetail } from '../services/api';

class CardItem extends React.Component {
  render() {
    const { item, onClickColocaCarrinho } = this.props;
    return (
      <div data-testid="product" className="product">
        <h3 className="title">
          { item.title }
        </h3>
        <img src={ item.thumbnail } alt={ item.title } width="150px" />
        <p className="price">
          {`R$: ${item.price}`}
        </p>
        <div>
          <Link
            to={ `/product-detail/${item.id}` }
            data-testid="product-detail-link"
          >
            <button
              className="button-details"
              type="button"
            >
              Mais detalhes...
            </button>
          </Link>
          <br />
          <button
            className="button-cardItens"
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
