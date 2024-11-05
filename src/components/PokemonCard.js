import React from "react";
import "./PokemonCard.css";

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

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card-inner">
        <div className="pokemon-number">
          #{String(pokemon.id).padStart(3, "0")}
        </div>
        <div className="sprite-container">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            className="pokemon-sprite"
          />
        </div>
        <div className="pokemon-info">
          <h3 className="pokemon-name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h3>
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
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
