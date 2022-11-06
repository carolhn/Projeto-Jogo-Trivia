import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  render() {
    const {
      data,
      answers,
      timer,
      result,
      nextButtonHandler,
      handleAnswer } = this.props;
    const { category, question } = data;
    return (
      <article className="game">
        <div>
          <p className="timer">
            <p>{ `   00:${timer}` }</p>
          </p>
        </div>

        <div className="question-container">
          <h1 className="category" data-testid="question-category">{ category }</h1>
        </div>

        <div className="question">
          <p data-testid="question-text">{ question }</p>
        </div>

        <div className="alternatives" data-testid="answer-options">
          {
            answers.map(({ value, correct }) => (
              <button
                type="button"
                value={ correct }
                key={ value }
                data-testid={ correct }
                className={ !result ? '' : correct }
                disabled={ result }
                onClick={ handleAnswer }
              >
                {value}
              </button>))
          }
          { (result) && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ nextButtonHandler }
            >
              Next
            </button>)}
        </div>
      </article>
    );
  }
}

QuestionCard.propTypes = {
  data: PropTypes.shape().isRequired,
  nextButtonHandler: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  timer: PropTypes.number.isRequired,
  result: PropTypes.bool.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};

export default QuestionCard;
