import React from "react";
import { Pokemon, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { ViewDetail } from "../App";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: ViewDetail;
  setViewDetail: React.Dispatch<React.SetStateAction<ViewDetail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setViewDetail } = props;

  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setViewDetail({
        id: id,
        isOpened: true,
      });
    }
  };

  return (
    <section
      className={
        viewDetail.isOpened
          ? "collection-container-active"
          : "collection-container"
      }
    >
      {viewDetail.isOpened ? <div className="overlay"></div> : <div></div>}
      {pokemons.map((pokemon) => {
        return (
          <div onClick={() => selectPokemon(pokemon.id)}>
            <PokemonList
              viewDetail={viewDetail}
              setViewDetail={setViewDetail}
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              abilities={pokemon.abilities}
              image={pokemon.sprites.front_default}
            />
          </div>
        );
      })}
    </section>
  );
};

export default PokemonCollection;
