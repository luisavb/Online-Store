import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getProductDetail,
} from '../services/api';
import CardItem from './CardItem';
import ShoppingCart from './ShoppingCart';

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
      carrinho: [],
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
    const resultadoPesquisa = await getProductsFromCategoryAndQuery(categoria, '');
    console.log(resultadoPesquisa.results);
    // console.log(categoria);
    this.setState({
      botaoCategoria: true,
      resultadoBotaoCategoria: resultadoPesquisa.results,
    });
  };

  onClickColocaCarrinho = async (id) => {
    // console.log('clicou');
    const productDetail = await getProductDetail(id);
    // console.log(productDetail);
    this.setState((estadoAnterior) => {
      const teste = estadoAnterior.carrinho;
      return ({
        carrinho: [...teste, productDetail],
      });
    });
  }

  render() {
    const {
      categorias,
      produto,
      pesquisa,
      loading,
      botaoCategoria,
      resultadoBotaoCategoria,
    } = this.state;
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
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          carrinho de compras
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
                key={ elemento.title }
                item={ elemento }
                onClickColocaCarrinho={ () => this.onClickColocaCarrinho(elemento.id) }
              />
            ))}
          </section>
        )}
        {/* {!loading && <p>Nenhum produto foi encontrado</p>} */}
        {botaoCategoria && (
          <>
            {resultadoBotaoCategoria.map((categoria, index) => (
              <CardItem
                key={ index }
                item={ categoria }
                onClickColocaCarrinho={ () => this.onClickColocaCarrinho(categoria.id) }
              />
            ))}
          </>
        )}
      </div>
    );
  }
}

export default Home;
