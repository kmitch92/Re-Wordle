import React from "react";
import "reactjs-popup/dist/index.css";
import legalWordsArray from "../legalWords";
import gameWordArray from "../words";

const DrawBox = ({
  openDrawBox,
  setOpenDrawBox,
  nextWord,
  setGameWord,
  setNextWord,
  setGuessList,
  gameWord,
  setCurrentGuess,
}) => {
  const handlePlayAgain = () => {
    setGameWord(nextWord);
    setNextWord(
      gameWordArray[Math.floor(Math.random() * gameWordArray.length)]
    );
    while (nextWord === gameWord) {
      setNextWord(
        gameWordArray[Math.floor(Math.random() * gameWordArray.length)]
      );
    }
    setCurrentGuess("");
    setGuessList([]);
    setOpenDrawBox(false);
  };

  const handleInsanePlay = () => {
    setGameWord(nextWord);
    setNextWord(
      legalWordsArray[Math.floor(Math.random() * legalWordsArray.length)]
    );
    while (nextWord === gameWord) {
      setNextWord(
        legalWordsArray[Math.floor(Math.random() * legalWordsArray.length)]
      );
    }
    setCurrentGuess("");
    setGuessList([]);
    setOpenDrawBox(false);
  };

  return openDrawBox ? (
    <div className="popup">
      <div className="popup-inner">
        <h1>Unlucky, you couldn't do it. Even with 6 tries...</h1>
        <h3>The wordle was {gameWord}</h3>
        <h5>
          Unlike the real Wordle, we let you play again to your heart's content.
        </h5>
        <h5>
          Pick from one of the options below. 'Play again' let's you... play
          again.
        </h5>
        <h5>
          Insane mode pits you agains the entire list of legal 5-letter words
          (there's almost 13,000 of them), <br /> rather than Wordle's curated
          list of 2315 words.
        </h5>
        <button
          className="popup-button"
          onClick={() => {
            handlePlayAgain();
          }}
        >
          Play Again
        </button>
        <button
          className="popup-button"
          onClick={() => {
            handleInsanePlay();
          }}
        >
          Play Insane Mode
        </button>
      </div>
    </div>
  ) : null;
};

export default DrawBox;
