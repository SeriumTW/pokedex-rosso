import React, { useState } from "react";
import "./PokemonList.css";

const POKEMON_TYPES = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
};

const PokemonDetail = ({ pokemon, onClose }) => {
  const [currentSprite, setCurrentSprite] = useState("front");

  const getStatName = (statName) => {
    const statMap = {
      hp: "HP",
      attack: "Attacco",
      defense: "Difesa",
      "special-attack": "Att. Sp.",
      "special-defense": "Dif. Sp.",
      speed: "Velocità",
    };
    return statMap[statName] || statName;
  };

  const toggleSprite = () => {
    if (currentSprite === "front") {
      setCurrentSprite("back");
    } else if (currentSprite === "back") {
      setCurrentSprite("shiny");
    } else {
      setCurrentSprite("front");
    }
  };

  return (
    <div className="pokemon-detail-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-inner">
          <div className="pokemon-number">
            #{String(pokemon.id).padStart(3, "0")}
          </div>

          <div className="sprite-container" onClick={toggleSprite}>
            <img
              src={pokemon.sprites[currentSprite]}
              alt={pokemon.name}
              className="pokemon-sprite"
            />
            <div className="sprite-hint">Clicca per ruotare</div>
          </div>

          <h2 className="pokemon-name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>

          <div className="pokemon-types">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="type-badge"
                style={{ backgroundColor: POKEMON_TYPES[type] }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>

          <div className="pokemon-info">
            <div className="info-row">
              <span>Altezza:</span>
              <span>{pokemon.height / 10}m</span>
            </div>
            <div className="info-row">
              <span>Peso:</span>
              <span>{pokemon.weight / 10}kg</span>
            </div>
          </div>

          <div className="pokemon-abilities">
            <h3>Abilità:</h3>
            {pokemon.abilities.map((ability, index) => (
              <div key={index} className="ability-badge">
                {ability.ability.name.charAt(0).toUpperCase() +
                  ability.ability.name.slice(1).replace("-", " ")}
              </div>
            ))}
          </div>

          <div className="pokemon-stats">
            <h3>Statistiche:</h3>
            {pokemon.stats.map((stat, index) => (
              <div key={index} className="stat-row">
                <span className="stat-name">
                  {getStatName(stat.stat.name)}:
                </span>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  >
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
