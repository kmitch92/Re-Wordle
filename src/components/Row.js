const Row = ({ guess }) => {
  let guessArray = guess.split('');
  const gLength = guessArray.length;
  const spaceRemaining = 5 - gLength;
  const guessRow = guessArray.concat(Array(spaceRemaining).fill(''));

  return (
    <div className="row">
      {guessRow.map((char, index) => (
        <span key={'square' + index} className="square" id={'square' + index}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default Row;
