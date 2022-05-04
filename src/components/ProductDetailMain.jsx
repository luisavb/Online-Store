import React from 'react';
import propTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { getProductDetail } from '../services/api';
import './ProductDetail.css';
// import Header from './Header';

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
    const { id } = this.props;
    // const { match: { params: { id } } } = this.props; // esse é o id[aparece no browser] do produto detalhado
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

    return (
      <main className="main-prod-detail">
        <section className="product-detail">
          <div className="product-img">
            <img src={ produto.thumbnail } alt={ produto.title } width="250px" />
          </div>
          <div className="product-descricao">
            <h3 className="title" data-testid="product-detail-name">
              { produto.title }
            </h3>
            <p className="price">{`R$: ${produto.base_price}`}</p>
            <h3 className="espec-tecnica">Especificações Técnicas</h3>
            <ul>
              <li className="li">{produto.warranty}</li>
              <li className="li">{`Condição: ${produto.condition}`}</li>
              <li className="li">{`Situação: ${produto.status}`}</li>
            </ul>
            <div>
              <button
                className="button-prod-detail"
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

            </div>
          </div>
        </section>
        {/* <Link to="/shopping-cart" data-testid="shopping-cart-button">
            carrinho de compras
          </Link> */}
        <section className="section-comentarios">
          <h3 className="opiniao-produto">Deixe sua opinião sobre o produto</h3>
          <div className="comentarios-conteudo">
            {/* <div className="form-comentarios"> */}
            <form className="form-comentarios">
              <input
                className="input-opiniao"
                type="email"
                name="email"
                id="email"
                value={ email }
                placeholder="Email"
                data-testid="product-detail-email"
                onChange={ this.changeInput }
              />
              <textarea
                className="textarea"
                type="text"
                name="texto"
                id="text"
                placeholder="Mensagem(opcional)"
                value={ texto }
                data-testid="product-detail-evaluation"
                onChange={ this.changeInput }
              />
              <p className="opiniao-produto">Sua avaliação</p>
              <div>
                {limite.map((e) => (
                  <label key={ e } htmlFor={ e }>
                    { e }
                    <input
                      className="radio"
                      id={ e }
                      type="radio"
                      data-testid={ `${e}-rating` }
                      name="avaliação"
                      onChange={ this.changeInput }
                    />
                  </label>
                )) }
              </div>
              <button
                className="button-detail-avaliar"
                type="submit"
                data-testid="submit-review-btn"
                onClick={ this.buttonLocalStorage }
              >
                Avaliar
              </button>
            </form>
            {/* </div> */}
            <div className="historico-comentarios">
              {comentarios.map((comentario, index) => (
                <div className="comentario" key={ comentario.email + index }>
                  <p className="nota">
                    { comentario.nota }
                  </p>
                  <p className="email">
                    { comentario.email }
                  </p>
                  <p className="texto">
                    { comentario.texto }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      // </div>
    );
  }
}

ProductDetail.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
  id: propTypes.string.isRequired,
  onClickColocaCarrinho: propTypes.func.isRequired,
};

export default ProductDetail;
