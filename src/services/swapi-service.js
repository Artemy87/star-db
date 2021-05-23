/* 
Код работающий с сетью изолируем в отдельный
класс-сервер для упращения тестирования и
поддержки кода, который работает с API.
 */

export default class SwapiService {
  _apiBase = "https://swapi.dev/api";

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`
      Could not fetch ${url},
      received ${res.status}`);
    }

    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this.transformPerson);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}`);
    return this.transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this.transformPlanet);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}`);
    return this.transformPlanet(planet);
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this.transformStarship);
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}`);
    return this.transformStarShip(starship);
  };

  _extractId = (item) => {
    const idRegEx = /\/(\d*)\/$/; // RegEx записывается между слэшами /регулярное выражение/.
    return item.url.match(idRegEx)[1]; // [0] это весь RegEx \/(\d*)\/$, вывод: /12/. А [1] это то, что в (), т.е. (\d*), вывод: 12.
  };

  transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };

  transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      homeWorld: person.homeworld,
      eyeColor: person.eyeColor,
    };
  };

  transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity,
    };
  };
}
