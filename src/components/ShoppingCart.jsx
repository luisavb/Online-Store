import React from 'react';
import PropTypes from 'prop-types';

// import { useParams } from 'react-router-dom';

class ShoppingCart extends React.Component {

  render() {
    const { carrinho } = this.props;
    return (
      <div>
        {!carrinho && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        {carrinho
          && carrinho.map((item, index) => (
            <div key={ index }>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{item.price}</p>
              <p data-testid="shopping-cart-product-quantity">
                {item.quantidade}
              </p>
            </div>
          ))}
      </div>
    );
  }
}


ShoppingCart.propTypes = {
  carrinho: PropTypes.arrayOf.isRequired,
  // itens: PropTypes.shape({
  //   title: PropTypes.string,
  //   thumbnail: PropTypes.string,
  //   price: PropTypes.number,
  //   id: PropTypes.string,
  // }).isRequired,
};

export default ShoppingCart;
