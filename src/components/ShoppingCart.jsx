import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

function ShoppingCart () {

  // const { handle } = useParams();
  const location = useLocation();
  const { itens: { carrinho } } = location.state;

  console.log(carrinho);

  // constructor(){
  //   super()
  //   this.state = {
  //     itens: [],
  //   }
  // }
  // render() {
    // const { location: { state: { itens } } } = this.props;
    // const location = useLocation()
    // const { itens } = location.state;
    // const { itens } = this.props;

    return (
      <div>
        {!carrinho && (
          <p
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </p>
        )}
        {carrinho && (
          carrinho.map((item) => (
            <div key={ item.id }>
              <p data-testid="shopping-cart-product-name" >
                { item.title }
              </p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>
                { item.price }
              </p>
            </div>
          )))}
      </div>);
  }
// }

ShoppingCart.propTypes = {
  itens: PropTypes.array.isRequired,
  // itens: PropTypes.shape({
  //   title: PropTypes.string,
  //   thumbnail: PropTypes.string,
  //   price: PropTypes.number,
  //   id: PropTypes.string,
  // }).isRequired,
};

export default ShoppingCart;
