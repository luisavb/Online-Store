import React from 'react';
import PropTypes from 'prop-types';
// import { getProductDetail } from '../services/api';

class Checkout extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   nome: '',
    //   cpf: '',
    //   email: '',
    //   tel: '',
    //   cep: '',
    //   endereco: '',
    //   metodo: '',
    // };
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput({ target }) {
    const { name } = target;
    if (target.type !== 'radio') {
      this.setState({ [name]: target.value });
    } else {
      this.setState({ metodo: target.id });
    }
  }

  render() {
    const { carrinho } = this.props;
    return (
      <div>
        <section>
          {carrinho !== 0
          && carrinho.map((item, index) => (
            <div key={ index }>
              <p>{item.title}</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{item.price}</p>
              <p>
                {item.quantidade}
              </p>
              <p>
                {' '}
                { item.total }
                {' '}
              </p>
            </div>
          ))}
          {/* soma de todos os preços */}
        </section>
        <section>
          <form>
            <input
              type="text"
              data-testid="checkout-fullname"
              placeholder="Nome Completo"
            />
            <input
              type="text"
              data-testid="checkout-cpf"
              name="cpf"
              placeholder="CPF"
            />
            <input
              type="email"
              data-testid="checkout-email"
              name="email"
              placeholder="Email"
            />
            <input
              type="tel"
              data-testid="checkout-phone"
              name="tel"
              placeholder="Telefone"
            />
            <input
              type="text"
              data-testid="checkout-cep"
              name="cep"
              placeholder="CEP"
            />
            <input
              type="text"
              data-testid="checkout-address"
              name="endereco"
              placeholder="Endereço"
            />
          </form>
          <form>
            <h3>Método de Pagamento</h3>
            <label htmlFor="boleto">
              <legend>Boleto</legend>
              <span> </span>
              <input type="radio" name="metodo" id="boleto" />
            </label>
            <label htmlFor="visa">
              <legend>Cartão de Crédito</legend>
              <input type="radio" name="metodo" id="visa" />
              Visa
            </label>
            <label htmlFor="master">
              <input type="radio" name="metodo" id="master" />
              MasterCard
            </label>
            <label htmlFor="elo">
              <input type="radio" name="metodo" id="elo" />
              Elo
            </label>
          </form>
        </section>
      </div>

    );
  }
}

Checkout.propTypes = {
  carrinho: PropTypes.arrayOf(PropTypes.objectOf),
};

Checkout.defaultProps = {
  carrinho: () => [],
};

export default Checkout;
