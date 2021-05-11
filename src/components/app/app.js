import React, { Component } from "react";
import "./app.css";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";

export default class App extends Component {
  
  state = {
    showRandomPlanet: true,
    selectedPerson: null
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  render() {
    return (
      <div className="app">
        <Header />
        <RandomPlanet />
        <ItemList
          onItemSelected={this.onPersonSelected}
        />
        <PersonDetails
          personId={this.state.selectedPerson}
        />
      </div>
    );
  }
}
