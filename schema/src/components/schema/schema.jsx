import React from "react";
import "./schema.css";

const Schema = () => {
  const arr = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
  ];

  return (
    <div class="container">
      <div class="schema-box">
        {arr.map((a) => (
          <h3 class="days">{a}</h3>
        ))}
      </div>
    </div>
  );
};

export default Schema;
