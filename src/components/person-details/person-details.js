import React, { Component } from "react";

import Spinner from '../spinner/spinner';
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button/error-button";

import "./person-details.css";

export default class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
  };

  componentDidMount() {
    this.updatePerson();
  }

  // !!! Если в componentDidUpdate() запускаем какие-то действия,
  // ! которые в конечном счете приведут к setState(),
  // ! то важно обернуть в условие!
  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) { // !!! сравниваем
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;

    if (!personId) {
      return;
    }

    this.swapiService.getPerson(personId).then((person) => {
      this.setState({ person });
    });
  }

  // componentWillMount();

  render() {
    if (!this.state.person) {
      return <span>Select a person from a list</span>;
    }

    const { id, name, gender, birthYear, eyeColor } = this.state.person;

    if (!this.person) {
      <Spinner/>
    }

    return (
      
      <div className="person-details">
        <img
          className="person"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="person"
        />
        <div>
          <h2>{name}</h2>
          <ul className="list-group-flush">
            <li className="list-group-item">
              <span>Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span>Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span>Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
