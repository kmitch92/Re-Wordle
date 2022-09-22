import { useEffect } from "react";

import legalWordsArray from "../legalWords";

const Qwerty = ({
  currentGuess,
  setCurrentGuess,
  setGuessList,
  setCurrentIndex,
  currentIndex,
  attempted,
  wrongPlace,
  rightPlace,
}) => {
  useEffect(() => {
    const row1 = document.getElementById("row1");
    const row2 = document.getElementById("row2");
    const row3 = document.getElementById("row3");

    if (row1 && row2 && row3) {
      const buttonRows = [row1.childNodes, row2.childNodes, row3.childNodes];
      buttonRows.forEach((rowButtons) => {
        rowButtons.forEach((button) => {
          if (attempted.includes(button.value)) {
            button.classList.add("key-attempted");
          }
          if (
            wrongPlace.includes(button.value) &&
            !button.classList.value.includes("rightPlace")
          ) {
            button.classList.add("key-wrongPlace");
          }
          if (rightPlace.includes(button.value)) {
            button.classList.add("key-rightPlace");
          }
          if (
            attempted.length === 0 &&
            wrongPlace.length === 0 &&
            rightPlace.length === 0 &&
            button.classList.value !== "specialKey"
          ) {
            button.classList.value = "key";
          }
        });
      });
    }
  }, [attempted, rightPlace, wrongPlace]);

  const handleClick = (event) => {
    event.preventDefault();
    const chars = /^[A-Za-z]+$/;

    if (
      currentGuess.length < 5 &&
      chars.test(event.target.value) &&
      event.target.value.length === 1
    ) {
      setCurrentGuess((curr) => curr + event.target.value);
    } else if (event.target.value === "⌫" && currentGuess.length >= 0) {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (
      event.target.value === "ENTER" &&
      currentGuess.length === 5 &&
      legalWordsArray.includes(currentGuess)
    ) {
      setGuessList((curr) => [...curr, currentGuess]);

      if (currentIndex < 5) {
        setCurrentGuess("");
        setCurrentIndex((curr) => curr + 1);
      }
    }
  };

  return (
    <div className="keyBoard">
      <div className="keyRow" id="row1">
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="q"
        >
          q
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="w"
        >
          w
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="e"
        >
          e
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="r"
        >
          r
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="t"
        >
          t
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="y"
        >
          y
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="u"
        >
          u
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="i"
        >
          i
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="o"
        >
          o
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="p"
        >
          p
        </button>
      </div>
      <div className="keyRow" id="row2">
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="a"
        >
          a
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="s"
        >
          s
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="d"
        >
          d
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="f"
        >
          f
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="g"
        >
          g
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="h"
        >
          h
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="j"
        >
          j
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="k"
        >
          k
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="l"
        >
          l
        </button>
      </div>
      <div className="keyRow" id="row3">
        <button
          className="specialKey"
          value="ENTER"
          onClick={(event) => {
            handleClick(event);
          }}
        >
          ENTER
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="z"
        >
          z
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="x"
        >
          x
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="c"
        >
          c
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="v"
        >
          v
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="b"
        >
          b
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="n"
        >
          n
        </button>
        <button
          onClick={(event) => {
            handleClick(event);
          }}
          className="key"
          value="m"
        >
          m
        </button>
        <button
          className="specialKey"
          value="⌫"
          onClick={(event) => {
            handleClick(event);
          }}
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

export default Qwerty;
