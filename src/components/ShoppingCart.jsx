import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const {
      carrinho,
      onClickRemoverItem,
      onClickDiminuirQuantidade,
      onClickAumentarQuantidade } = this.props;
    // if (carrinho.length > 0) {
    //   let teste = [];
    //   carrinho.forEach((i) => { teste += i.price; });
    //   console.log(teste);
    // } else {
    //   console.log('sem itens no carrinho');
    // }
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
              <button
                type="button"
                onClick={ () => onClickRemoverItem(item.title) }
              >
                Remover Item
              </button>
              <button
                type="button"
                onClick={ () => onClickAumentarQuantidade(item.title, item.price) }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <button
                type="button"
                onClick={ () => onClickDiminuirQuantidade(
                  item.title,
                  item.quantidade,
                  item.price,
                ) }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <p>
                {' '}
                { item.total }
                {' '}
              </p>
            </div>
          ))}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  carrinho: PropTypes.arrayOf(PropTypes.objectOf),
  onClickRemoverItem: PropTypes.func.isRequired,
  onClickDiminuirQuantidade: PropTypes.func.isRequired,
  onClickAumentarQuantidade: PropTypes.func.isRequired,
};

ShoppingCart.defaultProps = {
  carrinho: () => [],
};

export default ShoppingCart;
