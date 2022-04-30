import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import CardItem from './CardItem';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: '',
      categorias: [], // array das diversas categorias disponibilizadas pela API
      pesquisa: [],
      loading: false,
      botaoCategoria: false,
      resultadoBotaoCategoria: [],
    };
  }

  componentDidMount() {
    this.pegarCategoriasApi();
  }

  // a função abaixo utiliza a função disponibilizada pela API para pegar as categorias e as adiciono no state. Eu a coloco dentro do componentDidMount para que elas apareçam a partir do momento em que renderizo a pagina
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

  // função utilizada para buscar as categorias a serem mostradas na pagina principal a qual sera utilizada dentro do map
  pesquisarCategoria = async (categoria) => {
    const resultadoPesquisa = await getProductsFromCategoryAndQuery(
      categoria,
      '',
    );

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
          {categorias.map(({ id, name }) => ( // faço um map em todas as categorias disponibilizadas para que cada uma tenha um formato de botao e o seu atributo especifico
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
};

export default Home;
