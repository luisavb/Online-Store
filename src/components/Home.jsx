import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import CardItem from './CardItem';
import './Home.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      produto: '', // é o produto que escrevo dentro do input
      categorias: [], // array das diversas categorias disponibilizadas pela API
      pesquisa: [], // pega a pesquisa ao apertar o botao pesquisar
      loading: false, // utilizo como condicional para mostrar o resultado da pesquisa
      botaoCategoria: false, // utilizo como condicional para mostrar o resultado ao clicar no botao da categoria
      resultadoBotaoCategoria: [], // array a ser utilizado para receber o resultado das pesquisas ao clicar no botao da categoria
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

  // função generica que serve para, ao começar a digitar no local em que foi colocada, seja alterada a chave criada para recebe-la dentro do state
  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // essa função é complementanda pela função onChange acima
  // ao utilizar o onChange no campo de digitar para pesquisar, o state produto recebe os valores que estao sendo escritos
  // com isso, a função onClick pega o state produto e o utiliza como parametro da função API abaixo
  // Apos chama a função assincrona, eu pego o resultado e coloco dentro da chave pesquisa
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

  // função utilizada para buscar as categorias a serem mostradas na pagina principal a qual sera utilizada dentro do map quando eu aperto o botao da categoria especifica
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
      <div className="container-home">
        <div className="carrinho">
          <h1 id="trybewarts-header-title">Online Store</h1>
          <Link
            data-testid="shopping-cart-button"
            to="/shopping-cart"
          >
            <img src="./shopping-cart.png" alt="carrinho" width="40px" />
          </Link>
        </div>
        <label className="label-input" htmlFor="text" data-testid="home-initial-message">
          <h3>Digite algum termo de pesquisa ou escolha uma categoria.</h3>
          <input
            className="input-home"
            data-testid="query-input"
            onChange={ this.onChange }
            value={ produto }
            name="produto"
            type="text"
            id="text"
          />
        </label>
        <div className="button-div">
          <button className="button-home" onClick={ this.onClick } type="button" data-testid="query-button">
            Pesquisar
          </button>
        </div>
        <aside className="aside-home">
          {categorias.map(
            (
              { id, name }, // faço um map em todas as categorias disponibilizadas para que cada uma tenha um formato de botao e o seu atributo especifico. Ao clicar no botao da categoria especifica
            ) => (
              <button
                className="button-home"
                id="button-home2"
                data-testid="category"
                type="button"
                key={ id }
                onClick={ () => this.pesquisarCategoria(id) } // ao clicar no botao, vai salvar todos os elementos da categoria no state resultadoBotaoCategoria
              >
                {name}
              </button>
            ),
          )}
        </aside>
        {loading && (
          <section className="section-home">
            {pesquisa.map((elemento) => ( // uso a hof map para o cardItem mostrar as especificaçoes desejadas para cada elemento da pesquisa
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
        {botaoCategoria && ( // vira true o botaoCategoria ao clicar no botao da categoria especifica. Com isso, faço um map para que mostra para cada elemento os detalhes desejados
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
