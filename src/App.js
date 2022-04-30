import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      carrinho: [], // recebe os produtos a serem colocados no carrinho de compras
    };
  }

  onClickColocaCarrinho = (title, price, thumbnail) => { // requisito 8
    const { carrinho } = this.state; // pego os produtos colocados no carrinho
    const novoProduto = { // crio uma nova constante em que será colocados os paramentros colocados na função em questao
      title,
      price,
      thumbnail,
      quantidade: 1,
      total: price,
    };
    // faço uma hof que retornara um valor booleano true ou false caso exista um elemento do carrinho que possua um titulo igual ao titulo em analise
    const checarItem = carrinho.some((i) => i.title === title);
    // caso ja exista um produto no carrinho que ja tenho o mesmo titulo, retornando o valor true, peço para achar outro produto que possua o mesmo titulo e aumentar mais 1 no chave quantidade e retornar os preços somados dos produtos
    if (checarItem) {
      const adItem = carrinho.find((it) => it.title === title);
      adItem.quantidade += 1;
      adItem.total = adItem.price + price;
      // adItem.price += price;
    } else {
      // caso o carrinho nao possua um produto com esse titulo, peço que este produto seja adicionado a chave carrinho
      carrinho.push(novoProduto);
    }
  }

  onClickRemoverItem = (title) => {
    const { carrinho } = this.state;
    const index = carrinho.findIndex((i) => i.title === title);
    carrinho.splice(index, 1);
    this.setState({ carrinho });
  }

  onClickDiminuirQuantidade = (title, quantidade, price) => {
    if (quantidade === 1) return this.onClickRemoverItem(title);
    const { carrinho } = this.state;
    const itemRemove = carrinho.find((i) => i.title === title);
    itemRemove.quantidade -= 1;
    // console.log(price, itemRemove.price);
    itemRemove.total -= price;
    // console.log(itemRemove.price);
    this.setState({ carrinho });
  }

  onClickAumentarQuantidade = (title, price) => {
    const { carrinho } = this.state;
    const itemAdiciona = carrinho.find((i) => i.title === title);
    itemAdiciona.quantidade += 1;
    itemAdiciona.total += price;
    console.log(price, itemAdiciona.price);
    this.setState({ carrinho });
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
                carrinho={ carrinho } // os elementos adicionados pelo carrinho
                onClickRemoverItem={ this.onClickRemoverItem }
                onClickDiminuirQuantidade={ this.onClickDiminuirQuantidade }
                onClickAumentarQuantidade={ this.onClickAumentarQuantidade }
              />
            ) }
          />
          <Route
            path="/product-detail/:id"
            render={ (props) => (
              <ProductDetail
                { ...props }
                onClickColocaCarrinho={ this.onClickColocaCarrinho }
              />) }
          />
          <Route
            path="/checkout"
            render={ (props) => (
              <Checkout
                { ...props }
                carrinho={ carrinho }
              />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
