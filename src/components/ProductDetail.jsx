import React from 'react';
import { Link } from 'react-router-dom';
import './ProductDetail.css';
import propTypes from 'prop-types';
import ProductDetailMain from './ProductDetailMain';
// import { getProductDetail } from '../services/api';

class ProductDetail extends React.Component {
  render() {
    const { match: { params: { id } } } = this.props;
    const { onClickColocaCarrinho } = this.props;
    return (
      <div className="container-product">
        <header className="carrinho">
          <h1>Online Store</h1>
          <Link
            data-testid="shopping-cart-button"
            to="/shopping-cart"
          >
            <img src="../shopping-cart.png" alt="carrinho" width="40px" />
          </Link>
        </header>
        <ProductDetailMain id={ id } onClickColocaCarrinho={ onClickColocaCarrinho } />
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
  onClickColocaCarrinho: propTypes.func.isRequired,
};

export default ProductDetail;
