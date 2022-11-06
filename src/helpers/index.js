export const createAnswersArray = (correctAnswer, incorrectAnswers) => {
  const randomValue = 0.5;
  const incorrect = incorrectAnswers.map((value) => ({
    value,
    correct: 'wrong-answer',
  }));
  return [
    {
      value: correctAnswer,
      correct: 'correct-answer',
    },
    ...incorrect]
    .sort(() => Math.random() - randomValue);
};

export function scoreHelper(difficulty) {
  const easy = 1;
  const medium = 2;
  const hard = 3;

  if (difficulty === 'hard') {
    return hard;
  } if (difficulty === 'medium') {
    return medium;
  } if (difficulty === 'easy') {
    return easy;
  }
}
