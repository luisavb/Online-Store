import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Home from './components/Home';

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
      <Home />
    );
  }
}

export default App;
