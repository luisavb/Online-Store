import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductDetail } from '../services/api';

class ProductDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      produto: {},
    };
    // this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.PegaProduto(id);
  }

  PegaProduto = async (produtoId) => {
    const productDetail = await getProductDetail(produtoId);
    // console.log(productDetail);
    this.setState({
      produto: productDetail,
    });
  }

  render() {
    const { produto } = this.state;

    const { onClickColocaCarrinho } = this.props;
    // console.log(product.base_price);
    return (
      <div>
        <p data-testid="product-detail-name">{ produto.title }</p>
        <p>{produto.base_price}</p>
        <img src={ produto.thumbnail } alt={ produto.title } />
        <h3>Especificações Técnicas</h3>
        <ul>
          <li>{produto.warranty}</li>
          <li>{produto.condition}</li>
          <li>{produto.status}</li>
        </ul>

        <button
          onClick={ () => onClickColocaCarrinho(
            produto.title,
            produto.price,
            produto.thumbnail,
          ) }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>

        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          carrinho de compras
        </Link>
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
