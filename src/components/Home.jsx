import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
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

  render() {
    const { categorias } = this.state;
    return (
      <div>
        <label
          htmlFor="text"
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input
            type="text"
            id="text"
          />
        </label>
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
      </div>
    );
  }
}

export default Home;
