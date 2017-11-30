import React, { Component } from 'react';

import './App.css';

import Header from './containers/Header'
import Hero from './components/Hero'
import ProductList from './containers/ProductList'
import Terminal from './containers/Terminal'


import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {showTerminal: state.showTerminal };
}


class App extends Component {


  render() {
    return (
      <div className="main-container">
        <div className={this.props.showTerminal ? 'is-hidden' : ''}>
        <Header/> 
        <Hero /> 
        <ProductList/>
        </div>
        <Terminal />
      </div> 

    );
  }
}

export default connect(mapStateToProps)(App);
