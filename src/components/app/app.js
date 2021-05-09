import React from "react";
import "./app.css";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";

const App = () => {
  return (
    <div className="app">
      <Header />
      <RandomPlanet />
      <ItemList />
      <PersonDetails />
    </div>
  );
};

export default App;
