import "./App.css";
import Qwerty from "./components/Qwerty";
import Grid from "./components/Grid";
import legalWordsArray from "./legalWords";
import { useState, useRef } from "react";
import gameWordArray from "./words";

const App = () => {
  const [attempted, setAttempted] = useState([]);
  const [rightPlace, setRightPlace] = useState([]);
  const [wrongPlace, setWrongPlace] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessList, setGuessList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameWord, setGameWord] = useState(
    gameWordArray[Math.floor(Math.random() * gameWordArray.length)]
  );
  const [nextWord, setNextWord] = useState(
    gameWordArray[Math.floor(Math.random() * gameWordArray.length)]
  );

  while (nextWord === gameWord) {
    setNextWord(
      gameWordArray[Math.floor(Math.random() * gameWordArray.length)]
    );
  }

  const handleKeyUp = (event) => {
    event.preventDefault();
    const chars = /^[A-Za-z]+$/;

    if (currentGuess.length < 5 && chars.test(event.target.value)) {
      setCurrentGuess(() => event.target.value);
    } else if (
      event.nativeEvent.inputType === "deleteContentBackward" &&
      currentGuess.length >= 0
    ) {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }
  };

  const enterListener = (event) => {
    if (
      event.nativeEvent.key === "Enter" &&
      currentGuess.length === 5 &&
      legalWordsArray.includes(currentGuess)
    ) {
      setGuessList((curr) => [...curr, currentGuess]);

      if (currentIndex < 5) {
        setCurrentIndex((curr) => curr + 1);
        setCurrentGuess("");
      }
    }
  };

  const appendAttempted = () => {
    const rows = document.getElementsByClassName("row");

    let i = 0;

    while (i < guessList.length) {
      const rowSquares = rows[i].children;
      const rowSquaresArr = [...rowSquares];

      const gameWordArray = gameWord.split("");

      rowSquaresArr.forEach((square) => {
        if (gameWordArray[square.id.split("square")[1]] === square.innerHTML) {
          square.classList.add("rightPlace");
          setRightPlace((curr) => [...curr, square.innerHTML]);
          gameWordArray[square.id.split("square")[1]] = "";
        }
      });

      rowSquaresArr.forEach((square) => {
        if (
          gameWordArray.includes(square.innerHTML) &&
          ![...square.classList].includes("rightPlace")
        ) {
          square.classList.add("wrongPlace");
          setWrongPlace((curr) => [...curr, square.innerHTML]);
          gameWordArray[square.id.split("square")[1]] = "";
        }
      });

      rowSquaresArr.forEach((square) => {
        if (
          ![...square.classList].includes("rightPlace") &&
          ![...square.classList].includes("wrongPlace")
        ) {
          square.classList.add("attempted");
          setAttempted((curr) => [...curr, square.innerHTML]);
        }
      });
      i++;
    }
  };

  const textInput = useRef();
  const handleMouseUp = () => {
    textInput.current.focus();
  };

  return (
    <div className="App" onClick={handleMouseUp}>
      <header>
        <h1 className="title">Re-Wordle</h1>
      </header>
      <input
        className="input"
        autoFocus
        onChange={handleKeyUp}
        onKeyPress={enterListener}
        onKeyUp={appendAttempted}
        value={currentGuess}
        ref={textInput}
      ></input>
      <section>
        <Grid
          id="grid"
          currentGuess={currentGuess}
          currentIndex={currentIndex}
          guessList={guessList}
          setGuessList={setGuessList}
          setCurrentIndex={setCurrentIndex}
          setCurrentGuess={setCurrentGuess}
          gameWord={gameWord}
          setGameWord={setGameWord}
          nextWord={nextWord}
          setNextWord={setNextWord}
          setAttempted={setAttempted}
          setRightPlace={setRightPlace}
          setWrongPlace={setWrongPlace}
        />
      </section>
      <footer>
        <Qwerty
          id="qwerty"
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          setGuessList={setGuessList}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          attempted={attempted}
          rightPlace={rightPlace}
          wrongPlace={wrongPlace}
        />
      </footer>
    </div>
  );
};

export default App;
