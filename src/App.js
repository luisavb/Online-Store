import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class App extends React.Component {
  async componentDidMount() {
    await this.teste();
  }

  teste = async () => {
    getCategories().then((categories) => { console.log(categories); });
    getProductsFromCategoryAndQuery().then((categories) => { console.log(categories); });
  };

  render() {
    return (
      <>
      </>
    );
  }
}

export default App;
