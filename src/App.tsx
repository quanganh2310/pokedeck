import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon } from "./interface";

interface PokemonRawData {
  name: string;
  url: string;
}

export interface ViewDetail {
  id: number;
  isOpened: boolean;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextURl, setNextURL] = useState<string>("");
  const [onLoading, setOnLoading] = useState<boolean>(false);
  const [viewDetail, setViewDetail] = useState<ViewDetail>({
    isOpened: false,
    id: 0,
  });

  const nextPage = async () => {
    if (nextURl) {
      setOnLoading(true);
      let res = await axios.get(nextURl);
      setNextURL(res.data.next);
      const pokemonPromises = res.data.results.map(
        async (pokemon: PokemonRawData) => {
          const pokeInfo = await axios.get(pokemon.url);
          return pokeInfo.data;
        }
      );
      Promise.all(pokemonPromises).then((response) => {
        setPokemons((prev) => [...prev, ...response]);
        setOnLoading(false);
      });
    }
  };

  useEffect(() => {
    const getPokemon = async () => {
      setOnLoading(true);
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextURL(res.data.next);
      const pokemonPromises = res.data.results.map(
        async (pokemon: PokemonRawData) => {
          const pokeInfo = await axios.get(pokemon.url);
          return pokeInfo.data;
        }
      );
      Promise.all(pokemonPromises).then((response) => {
        setPokemons([...response]);
        setOnLoading(false);
      });
    };
    getPokemon();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={nextPage}>
              {onLoading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
