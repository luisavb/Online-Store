import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import ProductDetail from './components/ProductDetail';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      carrinho: [],
    };
  }

  onClickColocaCarrinho = (title, price, thumbnail) => {
    const { carrinho } = this.state;
    const novoProduto = {
      title,
      price,
      thumbnail,
      quantidade: 1,
    };

    const checarItem = carrinho.some((i) => i.title === title);
    if (checarItem) {
      const adItem = carrinho.find((it) => it.title === title);
      adItem.quantidade += 1;
    } else {
      carrinho.push(novoProduto);
    }
  }

  render() {
    const { carrinho } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home
                { ...props }
                onClickColocaCarrinho={ this.onClickColocaCarrinho }
              />
            ) }
          />
          <Route
            path="/shopping-cart"
            render={ (props) => (
              <ShoppingCart
                { ...props }
                carrinho={ carrinho }
              />
            ) }
          />
          <Route path="/product-detail/:id" component={ ProductDetail } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
