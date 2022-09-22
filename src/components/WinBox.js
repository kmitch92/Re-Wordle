import React from "react";
import "reactjs-popup/dist/index.css";
import legalWordsArray from "../legalWords";
import gameWordArray from "../words";

const WinBox = ({
  openWinBox,
  setOpenWinBox,
  nextWord,
  setGameWord,
  setNextWord,
  setGuessList,
  gameWord,
  setCurrentGuess,
  guessList,
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
    setOpenWinBox(false);
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
    setOpenWinBox(false);
  };

  return openWinBox ? (
    <div className="popup">
      <div className="popup-inner">
        <h1>{`Well Done! You got the word in ${guessList.length} tries.`}</h1>
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

export default WinBox;
