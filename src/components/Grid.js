import { useEffect, useState } from "react";
import Row from "./Row";
import WinBox from "./WinBox";
import DrawBox from "./DrawBox";

const Grid = ({
  currentGuess,
  currentIndex,
  setGuessList,
  gameWord,
  guessList,
  setGameWord,
  setCurrentIndex,
  nextWord,
  setNextWord,
  setCurrentGuess,
  setAttempted,
  setWrongPlace,
  setRightPlace,
}) => {
  const [openWinBox, setOpenWinBox] = useState(false);
  const [openDrawBox, setOpenDrawBox] = useState(false);

  const toggleWinBox = () => {
    if (guessList.includes(gameWord)) {
      setTimeout(function () {
        setOpenWinBox(true);
      }, 500);
    }
  };

  const toggleDrawBox = () => {
    if (
      guessList.length >= 6 &&
      !guessList.includes(gameWord) &&
      openWinBox === false
    ) {
      setTimeout(function () {
        setOpenDrawBox(true);
      }, 500);
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
        if (
          gameWordArray.includes(square.innerHTML) &&
          ![...square.classList].includes("rightPlace")
        ) {
          square.classList.add("wrongPlace");
          setWrongPlace((curr) => [...curr, square.innerHTML]);
          gameWordArray[square.id.split("square")[1]] = "";
        }
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

  useEffect(() => {
    if (guessList.length === 0) {
      setAttempted([]);
      setWrongPlace([]);
      setRightPlace([]);
      const rows = [...document.getElementsByClassName("row")];
      let i = 0;
      while (i < 6) {
        const rowSquares = rows[i].children;
        const rowSquaresArr = [...rowSquares];
        rowSquaresArr.forEach((square) => {
          square.classList.value = "square";
        });
        i++;
      }
    }
    if (guessList.length < 6) {
      setCurrentIndex(guessList.length);
    }
    appendAttempted();
    toggleWinBox();
    toggleDrawBox();
  }, [guessList]);

  useEffect(() => {
    const rows = [...document.getElementsByClassName("row")];
    const rowSquaresArr = [...rows[currentIndex].children];
    let squaresToAdd = 5 - currentGuess.length;
    let thisGuess = currentGuess;
    while (squaresToAdd > 0) {
      thisGuess += " ";
      squaresToAdd--;
    }
    rowSquaresArr.forEach((square, index) => {
      square.innerHTML = thisGuess[index];
    });
  }, [currentGuess]);

  const guessRemaining = 6 - guessList.length;
  const guessGrid = [...guessList];
  for (let i = 0; i < guessRemaining; i++) {
    guessGrid.push("");
  }

  return (
    <>
      {openWinBox ? (
        <WinBox
          openWinBox={openWinBox}
          setOpenWinBox={setOpenWinBox}
          nextWord={nextWord}
          setGameWord={setGameWord}
          setNextWord={setNextWord}
          setGuessList={setGuessList}
          gameWord={gameWord}
          setCurrentGuess={setCurrentGuess}
          guessList={guessList}
        ></WinBox>
      ) : null}

      {openDrawBox ? (
        <DrawBox
          openDrawBox={openDrawBox}
          setOpenDrawBox={setOpenDrawBox}
          nextWord={nextWord}
          setGameWord={setGameWord}
          setNextWord={setNextWord}
          setGuessList={setGuessList}
          gameWord={gameWord}
          setCurrentGuess={setCurrentGuess}
        ></DrawBox>
      ) : null}

      <div className="grid">
        {guessGrid.map((guess, index) => {
          return (
            <>
              <Row
                key={"row" + index}
                id={"row" + index}
                guess={guess}
                className="row"
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Grid;
