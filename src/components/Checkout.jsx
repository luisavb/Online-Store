import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// import { getProductDetail } from '../services/api';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      cpf: '',
      email: '',
      tel: '',
      cep: '',
      endereco: '',
      metodo: '',
      redirecionar: true, // caso os itens estjam todos preenchidos, ira redirecionar para a pagina principal do site
      mensagem: true, // caso seja falso, ira mostrar uma mensagem pedindo para preencher os requisitos
    };
    this.changeInput = this.changeInput.bind(this);
  }

  button = (event) => {
    event.preventDefault();
    const { nome, cpf, email, cep, endereco, metodo } = this.state;
    if (nome.length > 0
        && cpf.length > 0
        && email.length > 0
        && cep.length > 0
        && endereco.length > 0
        && metodo.length > 0) {
      this.setState({ redirecionar: false });
    } else {
      this.setState({ mensagem: false });
    }
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
    const {
      nome,
      cpf,
      email,
      tel,
      cep,
      endereco,
      redirecionar,
      mensagem,
    } = this.state;

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
              value={ nome }
              data-testid="checkout-fullname"
              name="nome"
              placeholder="Nome Completo"
              onChange={ this.changeInput }
            />
            <input
              type="text"
              value={ cpf }
              data-testid="checkout-cpf"
              name="cpf"
              placeholder="CPF"
              onChange={ this.changeInput }
            />
            <input
              type="email"
              value={ email }
              data-testid="checkout-email"
              name="email"
              placeholder="Email"
              onChange={ this.changeInput }
            />
            <input
              type="tel"
              value={ tel }
              data-testid="checkout-phone"
              name="tel"
              placeholder="Telefone"
              onChange={ this.changeInput }
            />
            <input
              type="text"
              value={ cep }
              data-testid="checkout-cep"
              name="cep"
              placeholder="CEP"
              onChange={ this.changeInput }
            />
            <input
              type="text"
              value={ endereco }
              data-testid="checkout-address"
              name="endereco"
              placeholder="Endereço"
              onChange={ this.changeInput }
            />
          </form>
          <form>
            <h3>Método de Pagamento</h3>
            <label htmlFor="boleto">
              <legend>Boleto</legend>
              <span> </span>
              <input
                type="radio"
                name="metodo"
                id="boleto"
                onChange={ this.changeInput }
              />
            </label>
            <label htmlFor="visa">
              <legend>Cartão de Crédito</legend>
              <input type="radio" name="metodo" id="visa" onChange={ this.changeInput } />
              Visa
            </label>
            <label htmlFor="master">
              <input
                type="radio"
                name="metodo"
                id="master"
                onChange={ this.changeInput }
              />
              MasterCard
            </label>
            <label htmlFor="elo">
              <input type="radio" name="metodo" id="elo" onChange={ this.changeInput } />
              Elo
            </label>
          </form>
          <button
            type="submit"
            onClick={ this.button }
          >
            Comprar
          </button>
        </section>
        { !redirecionar && <Redirect to="/" /> }
        { !mensagem && <p> Preencha todos os campos </p> }
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
