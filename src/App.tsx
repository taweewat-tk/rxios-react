import logo from "./logo.svg";
import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Pokemon from "./repository/pokemon.repository";

function App() {
  const [images, setImages] = useState<string[]>([]);
  const [initial, setInitial] = useState(false);
  const pokemon = useMemo(() => {
    return new Pokemon();
  }, []);
  useEffect(() => {
    setInitial(true);
    setImages([]);
    if (initial)
      pokemon.getAllPokemon().subscribe({
        next: ({ results }: any) => {
          results.forEach((item: any) => {
            pokemon.getPokemon(item.url).subscribe((item) => {
              setImages((img) => [...img, item]);
            });
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }, [pokemon, initial]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {images.map((img) => {
            return (
              <img src={img} width="80px" height="80px" alt="images-logo" />
            );
          })}
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
