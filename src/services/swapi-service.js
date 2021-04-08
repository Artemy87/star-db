/* 
Код работающий с сетью изолируем в отдельный
класс-сервер для упращения тестирования и
поддержки кода, который работает с API.
 */

export default class SwapiServerce {
  _apiBase = "https://swapi.dev/api";

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`
      Could not fetch ${url},
      received ${res.status}`);
    }

    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results;
  }

  getPerson(id) {
    return this.getResource(`/people/${id}`);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res;
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}`);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res;
  }

  getStarships(id) {
    return this.getResource(`/starships/${id}`);
  }
}