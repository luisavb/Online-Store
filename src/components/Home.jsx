import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
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
      </div>
    );
  }
}

export default Home;
