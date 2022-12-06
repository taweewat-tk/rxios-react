import { map } from "rxjs";
import { getPokemonUrl } from "../constant/api";
import Rxios from "../services/rxios";

class Pokemon {
  private http: Rxios;
  constructor() {
    this.http = new Rxios({
      baseURL: getPokemonUrl(),
    });
  }

  getAllPokemon() {
    return this.http.get("/api/v2/pokemon");
  }

  getPokemon(url: string) {
    return this.http
      .get(url)
      .pipe(map((item: any) => item.sprites.other.dream_world.front_default));
  }
}
export default Pokemon;
