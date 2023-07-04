import React from "react";

function Card(props) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={props.image} />
      </div>
      <div className="card-title">
        <h2>{props.title}</h2>
      </div>
    </div>
  );
}

export default Card;
