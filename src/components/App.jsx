/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import "../styles/App.scss";
// >La aplicación debe permitir filtrar por el nombre personaje o por frase
// >Al escribir en el input de la cabecera se deben ocultar las frases que no coincida con lo escrito.
// >Por supuesto, debe dar igual si la usuaria escribe el texto en mayúsculas o minúsculas.
// >Además queremos que la usuaria pueda añadir más frases de la serie al listado.
// extra:
// > Filtrado exclusivo por personajes con un select

function App() {
  const [phrasesList, setPhrasesList] = useState([]);
  const [search, setSearch] = useState("");
  const [newPhrase, setNewPhrase] = useState({ quote: "", character: "" });
  const [char, setCharacter] = useState("every");

  useEffect(() => {
    fetch(
      "https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setPhrasesList(data);
      });
  }, []);

  const renderPrhases = () => {
    return phrasesList
      .filter(
        (item) =>
          item.quote.toLowerCase().includes(search.toLowerCase()) ||
          item.character.toLowerCase().includes(search.toLowerCase())
      )

      .filter((each) => {
        if (char === "every") {
          return true;
        } else {
          return each.character === char;
        }
      })

      .map((phrase, i) => {
        return (
          <li className="li" key={i}>
            <p>{phrase.quote}</p>
            <p className="name">{phrase.character}</p>
          </li>
        );
      });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };
  const handleInput = (ev) => {
    setSearch(ev.target.value);
  };

  const handleCharacter = (ev) => {
    setCharacter(ev.target.value);
  };

  const handleInputAdd = (ev) => {
    setNewPhrase({ ...newPhrase, [ev.target.id]: ev.target.value });
  };

  const handleClick = () => {
    setPhrasesList([...phrasesList, newPhrase]);
  };

  return (
    <>
      <section className="firstSection">
        <h1 className="title1">QUOTES * FROM * FRIENDS </h1>
      </section>

      <form onSubmit={handleSubmit}>
        <fieldset className="firstForm">
          <label htmlFor="word">Who said what?!</label>
          <input
            type="text"
            name="word"
            id="word"
            value={search}
            onChange={handleInput}
          />

          <label htmlFor="">Look for your favourite quote by character:</label>
          <select className="select" name="char" id="char" value={char} onChange={handleCharacter}>
            <option value="every">Everybody</option>
            <option value="Chandler">Chandler</option>
            <option value="Joey">Joey</option>
            <option value="Monica">Monica</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Rachel">Rachel</option>
            <option value="Ross">Ross</option>
          </select>
          <p className="phraseAdd">
            {" "}
            Add a new quote of any of the show's characters at the bottom of this page!{" "}
            <a href="#secondForm" ><i className="fa-solid fa-circle-down"></i></a>
          </p>
        </fieldset>
      </form>

      <ul className="ul"> {renderPrhases()} </ul>

      <form onSubmit={handleSubmit}>
        <fieldset className="secondForm" id="secondForm">
          <h2 className="title2"> Add a new quote!</h2>
          <input
            className="input"
            type="text"
            name="quote"
            id="quote"
            placeholder="write a quote"
            value={newPhrase.quote}
            onChange={handleInputAdd}
          />
          <input
            className="input"
            type="text"
            name="character"
            id="character"
            placeholder="write a character"
            value={newPhrase.character}
            onChange={handleInputAdd}
          />

          <input
            className="input add"
            type="submit"
            value="Add"
            onClick={handleClick}
          />
        </fieldset>
      </form>
    </>
  );
}

export default App;
