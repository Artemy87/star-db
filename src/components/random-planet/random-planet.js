import React, { Component } from "react";
import "./random-planet.css";
import SwapiService from "../../services/swapi-service";

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {}
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet });
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 17) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded);
  }

  render() {
    const { planet: { id, name, population, rotationPeriod, diameter} } = this.state;

    return (
      <div className="random-planet">
        <img
          className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          alt="Planet"
        />
        <div>
          <h3>{name}</h3>
          <ul className="list-grup list-group-flush">
            <li className="list-group-item">
              <span>Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span>Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span>Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
