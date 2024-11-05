import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
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

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const promises = [];
        for (let i = 1; i <= 151; i++) {
          promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }
        const responses = await Promise.all(promises);
        const pokemonData = responses.map((response) => ({
          id: response.data.id,
          name: response.data.name,
          types: response.data.types.map((type) => type.type.name),
        }));
        setPokemon(pokemonData);
      } catch (error) {
        console.error("Errore nel caricamento dei Pokemon:", error);
        setError("Errore nel caricamento dei Pokemon. Riprova più tardi.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon =
    selectedType === "all"
      ? pokemon
      : pokemon.filter((p) => p.types.includes(selectedType));

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Riprova
        </button>
      </div>
    );
  }

  return (
    <div className="pokedex-container" role="main" aria-label="Pokedex">
      <div className="pokedex-top">
        <div className="pokedex-lights" aria-hidden="true">
          <div className="big-light"></div>
          <div className="small-lights">
            <div className="small-light"></div>
            <div className="small-light"></div>
            <div className="small-light"></div>
          </div>
        </div>
      </div>
      <div className="pokedex-screen">
        {loading ? (
          <div
            className="loading"
            role="status"
            aria-label="Caricamento Pokedex"
          >
            <div className="loading-text">Caricamento Pokédex...</div>
            <div className="loading-animation">
              <div className="pokeball"></div>
            </div>
          </div>
        ) : (
          <>
            <div
              className="type-filters"
              role="toolbar"
              aria-label="Filtri per tipo di Pokemon"
            >
              <button
                className={`type-button all ${
                  selectedType === "all" ? "active" : ""
                }`}
                onClick={() => setSelectedType("all")}
                aria-pressed={selectedType === "all"}
              >
                Tutti
              </button>
              {Object.entries(POKEMON_TYPES).map(([type, color]) => (
                <button
                  key={type}
                  className={`type-button ${type} ${
                    selectedType === type ? "active" : ""
                  }`}
                  onClick={() => setSelectedType(type)}
                  style={{ backgroundColor: color }}
                  aria-pressed={selectedType === type}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            <div
              className="pokemon-grid"
              role="list"
              aria-label="Lista Pokemon"
            >
              {filteredPokemon.map((p) => (
                <div key={p.id} role="listitem">
                  <PokemonCard pokemon={p} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="pokedex-bottom">
        <div className="control-pad" aria-hidden="true">
          <div className="d-pad">
            <div className="d-pad-vertical"></div>
            <div className="d-pad-horizontal"></div>
          </div>
          <div className="action-buttons">
            <div className="action-button"></div>
            <div className="action-button"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
