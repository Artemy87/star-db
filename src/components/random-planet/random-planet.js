import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

import "./random-planet.css";

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  };

  // componentDidMount - метод жизненного цикла компонента(lifecycle hooks). Вызывается после того,
  // как компонент первый раз удачно проинициализировался и отрисовался на странице.
  // componentDidMount это удачное место(не использовать конструктор для этих целей) для того,
  // чтобы проводить начальную инициализацию компонента или делать запросы к API.
  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 6000);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random()*18) + 1;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
