import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { carrinho } = this.props;
    console.log(carrinho.length);
    return (
      <div>
        {carrinho.length === 0 && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        {carrinho !== 0
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
  carrinho: PropTypes.arrayOf(PropTypes.objectOf),
};

ShoppingCart.defaultProps = {
  carrinho: () => [],
};

export default ShoppingCart;
