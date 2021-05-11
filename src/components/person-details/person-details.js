import React, { Component } from "react";
import "./person-details.css";

export default class PersonDetails extends Component {

  render() {
      return (
    <div className="person-details">
      <img
        className="person"
        src={`https://starwars-visualguide.com/assets/img/characters/3.jpg`}
        alt="person"
      />
      <div>
        <h2>R2-D2</h2>
        <ul className='list-group-flush'>
          <li className='list-group-item'>
            <span>Gender</span>
            <span>male</span>
          </li>
          <li className='list-group-item'>
            <span>Birth Year</span>
            <span>43</span>
          </li>
          <li className='list-group-item'>
            <span>Eye Color</span>
            <span>red</span>
          </li>
        </ul>
      </div>
    </div>
  );
  }

};