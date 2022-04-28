import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import CardItem from './CardItem';
// import ShoppingCart from './ShoppingCart';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: '',
      categorias: [],
      pesquisa: [],
      loading: false,
      botaoCategoria: false,
      resultadoBotaoCategoria: [],
    };
  }

  componentDidMount() {
    this.pegarCategoriasApi();
  }

  pegarCategoriasApi = async () => {
    const resultado = await getCategories();
    this.setState({ categorias: resultado });
    // console.log(resultado);
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClick = async () => {
    const { produto } = this.state;
    const resultadoPesquisa = await getProductsFromCategoryAndQuery(
      '',
      produto,
    );
    this.setState({
      pesquisa: resultadoPesquisa.results,
      loading: true,
    });
  };

  pesquisarCategoria = async (categoria) => {
    const resultadoPesquisa = await getProductsFromCategoryAndQuery(
      categoria,
      '',
    );
    // console.log(resultadoPesquisa.results);
    // console.log(categoria);
    this.setState({
      botaoCategoria: true,
      resultadoBotaoCategoria: resultadoPesquisa.results,
    });
  };

  render() {
    const {
      categorias,
      produto,
      pesquisa,
      loading,
      botaoCategoria,
      resultadoBotaoCategoria,
    } = this.state;
    const { onClickColocaCarrinho } = this.props;
    return (
      <div>
        <label htmlFor="text" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input
            data-testid="query-input"
            onChange={ this.onChange }
            value={ produto }
            name="produto"
            type="text"
            id="text"
          />
        </label>
        <button onClick={ this.onClick } type="button" data-testid="query-button">
          Pesquisar
        </button>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          Carrinho
        </Link>
        <aside>
          {categorias.map(({ id, name }) => (
            <button
              data-testid="category"
              type="button"
              key={ id }
              onClick={ () => this.pesquisarCategoria(id) }
            >
              {name}
            </button>
          ))}
        </aside>
        {loading && (
          <section>
            {pesquisa.map((elemento) => (
              <CardItem
                key={ elemento.id }
                item={ elemento }
                onClickColocaCarrinho={ () => onClickColocaCarrinho(
                  elemento.title,
                  elemento.price,
                  elemento.thumbnail,
                ) }
              />
            ))}
          </section>
        )}
        {/* {!loading && <p>Nenhum produto foi encontrado</p>} */}
        {botaoCategoria && (
          <>
            {resultadoBotaoCategoria.map((categoria) => (
              <CardItem
                key={ categoria.id }
                item={ categoria }
                onClickColocaCarrinho={ () => onClickColocaCarrinho(
                  categoria.title,
                  categoria.price,
                  categoria.thumbnail,
                ) }
              />
            ))}
          </>
        )}
      </div>
    );
  }
}
Home.propTypes = {
  onClickColocaCarrinho: PropTypes.func.isRequired,
  // itens: PropTypes.shape({
  //   title: PropTypes.string,
  //   thumbnail: PropTypes.string,
  //   price: PropTypes.number,
  //   id: PropTypes.string,
  // }).isRequired,
};

export default Home;
