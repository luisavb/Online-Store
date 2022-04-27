import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { itens } = this.props;
    return (
      <div>
        {!itens && (
          <p
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </p>
        )}
        {itens && (
          itens.map((item) => (
            <div key={ item.id }>
              <p
                data-testid="shopping-cart-product-name"
              >
                { item.title }
              </p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>
                {item.price}
              </p>
            </div>
          )))}
      </div>);
  }
}

ShoppingCart.propTypes = {
  itens: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
};

export default ShoppingCart;
