import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductDetail } from '../services/api';

class ProductDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      produto: {},
      // avaliação: false,
      email: '',
      texto: '',
      nota: '',
    };
    this.changeInput = this.changeInput.bind(this);
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

  buttonLocalStorage = () => {
    const { email, texto, nota } = this.state;
    const form = { email, texto, nota };
    localStorage.setItem('review', JSON.stringify(form));
  }

  changeInput({ target }) {
    const { name } = target;
    if (target.type !== 'radio') {
      this.setState({ [name]: target.value });
    } else {
      this.setState({ nota: target.id });
    }
  }

  render() {
    const { produto, email, texto } = this.state;

    const limite = ['1', '2', '3', '4', '5'];

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
        <form>
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            placeholder="Email"
            data-testid="product-detail-email"
            onChange={ this.changeInput }
          />
          {limite.map((e) => (
            <label key={ e } htmlFor={ e }>
              { e }
              <input
                id={ e }
                type="radio"
                data-testid={ `${e}-rating` }
                name="avaliação"
                onChange={ this.changeInput }
              />
            </label>

          )) }
          <textarea
            type="text"
            name="texto"
            id="text"
            placeholder="Mensagem(opcional)"
            value={ texto }
            data-testid="product-detail-evaluation"
            onChange={ this.changeInput }
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.buttonLocalStorage }
          >
            Salvar?
          </button>
        </form>
        {localStorage.getItem('review')}

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
