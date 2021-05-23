import React, { Component } from "react";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";

import ErrorIndicator from "../error-indicator";

import "./people-page.css";
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
    hasError: false,
  };

  componentDidCatch(error, info) {
    debugger;
    this.setState({ hasError: true });
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <React.Fragment>
        <ItemList
          onItemSelected={this.onPersonSelected}
          getData={this.swapiService.getAllPeople}
          renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}
        />
        <PersonDetails personId={this.state.selectedPerson} />
      </React.Fragment>
    );
  }
}
