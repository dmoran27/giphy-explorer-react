import type { Gif } from "../interfaces/gif.interface";


interface Props {
  gifs: Gif[];
}

export const GifList = ({ gifs }: Props) => {
  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <div className="gif-card" key={gif.id}>
          {/* Añadido alt para accesibilidad */}
          <img src={gif.url} alt={gif.title || "Gif"} loading="lazy" />
          
          {/* Un contenedor para los textos ayuda a controlar el espaciado */}
          <div className="gif-card-info">
            <h3>{gif.title || "Sin título"}</h3>
            <p>{gif.width} x {gif.height} (1.5 MB)</p>
          </div>
        </div>
      ))}
    </div>
  );
};