import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductDetail } from '../services/api';
import './comentarios.css';

class ProductDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      produto: {}, // recebe o produto
      // avaliação: false,
      email: '',
      texto: '',
      nota: '',
      comentarios: [], // recebe os comentarios dos antigos compradores
    };
    this.changeInput = this.changeInput.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props; // esse é o id[aparece no browser] do produto detalhado
    this.PegaProduto(id);
    // verifica se há rewiews no localStorage, senão cria um array vazio.
    if (!JSON.parse(localStorage.getItem('reviews'))) {
      localStorage.setItem('reviews', JSON.stringify([]));
    }
    //  pega os reviews no localStorage e seta no State.
    const reviews = JSON.parse(localStorage.getItem('reviews'));
    this.setState({ comentarios: reviews });
  }

  // função que pega os detalhes do produto em analise e seta a chave produto do state
  PegaProduto = async (produtoId) => {
    const productDetail = await getProductDetail(produtoId);
    // console.log(productDetail);
    this.setState({
      produto: productDetail,
    });
  }

  buttonLocalStorage = (event) => {
    event.preventDefault();
    const { email, texto, nota } = this.state;
    const form = { email, texto, nota };
    // verifica se há reviews no localStorage, senão cria um array vazio.
    if (!JSON.parse(localStorage.getItem('reviews'))) {
      localStorage.setItem('reviews', JSON.stringify([]));
    }
    // pega os reviews no localStorage e seta o que já tinha com o novo comentario.
    // alterado os reviews para receber array de objetos e nao somente um objeto.
    let reviews = JSON.parse(localStorage.getItem('reviews'));
    localStorage.setItem('reviews', JSON.stringify([...reviews, form])); // faço spread operator para poder adicionar os novos comentarios sem apagar os antigos
    reviews = JSON.parse(localStorage.getItem('reviews')); // pego os novos comentarios e adiciono no state
    this.setState({
      email: '',
      texto: '',
      nota: '',
      comentarios: reviews,
    });
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
    const { produto, email, texto, comentarios } = this.state;

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
            Avaliar
          </button>
        </form>
        {comentarios.map((comentario, index) => (
          <div className="comentario" key={ comentario.email + index }>
            <p>
              { comentario.email }
            </p>
            <p>
              { comentario.nota }
            </p>
            <p>
              { comentario.texto }
            </p>
          </div>
        ))}

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
