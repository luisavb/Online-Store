import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import ProductDetail from './components/ProductDetail';

class App extends React.Component {
  // async componentDidMount() {
  //   await this.teste();
  // }

  // teste = async () => {
  //   getCategories().then((categories) => { console.log(categories); });
  //   getProductsFromCategoryAndQuery('', 'computador')
  //     .then((categories) => { console.log(categories); });
  // };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/shopping-cart" component={ ShoppingCart } />
          <Route path="/product-detail/:id" component={ ProductDetail } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
