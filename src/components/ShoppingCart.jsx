import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {
  render() {
    const {
      carrinho,
      onClickRemoverItem,
      onClickDiminuirQuantidade,
      onClickAumentarQuantidade,
    } = this.props;

    return (
      <div>
        {carrinho.length === 0 && ( // caso o carrinho esteja vazio, aparecera esta msg
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        {carrinho !== 0
          && carrinho.map((item, index) => (
            <div className="productCart" key={ index }>
              <img src={ item.thumbnail } alt={ item.title } width="150px" />
              <div className="itemCart">
                <p data-testid="shopping-cart-product-name">{item.title}</p>
                <p>{`Valor unitário: R$ ${item.price}`}</p>
                <p data-testid="shopping-cart-product-quantity">
                  {`Quantidade:${item.quantidade}`}
                </p>
                <p>{`Valor Total: R$ ${item.total}`}</p>
              </div>
              <div className="botaoCart">
                <button
                  className="buttonCartItens"
                  type="button"
                  onClick={ () => onClickRemoverItem(item.title) }
                >
                  Remover Item
                </button>
                <button
                  className="buttonCartItensAumentar"
                  type="button"
                  onClick={ () => onClickAumentarQuantidade(item.title, item.price) }
                  data-testid="product-increase-quantity"
                >
                  +
                </button>
                <button
                  className="buttonCartItensRemover"
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
              </div>
            </div>
          ))}
        <Link to="/checkout" data-testid="checkout-products">
          <button className="buttonCartItensCheckOut" type="button">
            Checkout
          </button>
        </Link>
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
