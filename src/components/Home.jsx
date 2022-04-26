import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CardItem from './CardItem';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: '',
      categorias: [],
      pesquisa: [],
    };
  }

  componentDidMount() {
    this.pegarCategoriasApi();
  }

  pegarCategoriasApi = async () => {
    const resultado = await getCategories();
    this.setState({ categorias: resultado });
    console.log(resultado);
  };

  onChange =({ target }) => {
    const {
      name,
      value,
    } = target;
    this.setState({ [name]: value });
  }

  onClick = async () => {
    const { produto } = this.state;
    const resultadoPesquisa = await getProductsFromCategoryAndQuery('', produto);
    this.setState({
      pesquisa: resultadoPesquisa.results,
    });
  }

  render() {
    const {
      categorias,
      produto,
      pesquisa,
    } = this.state;
    return (
      <div>
        <label
          htmlFor="text"
          data-testid="home-initial-message"
        >
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
        <button
          onClick={ this.onClick }
          type="button"
          data-testid="query-button"
        >
          Pesquisar
        </button>
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          carrinho de compras
        </Link>
        <aside>
          { categorias.map(({ id, name }) => (
            <button
              data-testid="category"
              type="button"
              key={ id }
            >
              { name }
            </button>
          ))}
        </aside>
        <section>
          { pesquisa.map((elemento) => (<CardItem key={ elemento.title } item={ elemento } />))}
        </section>
      </div>
    );
  }
}

export default Home;
