import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { createAnswersArray, scoreHelper } from '../helpers';
import { updateScore } from '../redux/actions';

class Game extends React.Component {
  state = {
    actualQuestion: 0,
    questions: [],
    isLoading: true,
    answers: [],
    timer: 30,
    result: false,
  };

  componentDidMount() {
    this.fetchQuestions();
    this.cronometro();
  }

  cronometro = () => {
    this.setState({ timer: 30 }, () => {
      const second = 1000;
      const idInterval = setInterval(() => {
        this.setState((prevState) => ({
          result: false,
          timer: prevState.timer - 1,
        }), () => {
          const { timer } = this.state;
          if (timer === 0 || timer < 0) {
            clearInterval(idInterval);
            this.setState({
              timer: 0,
              result: true,
            });
          }
        });
      }, second);
    });
  };

  handleAnswer = (event) => {
    const { value } = event.target;
    const { update } = this.props;
    const { timer, actualQuestion, questions } = this.state;
    const { difficulty } = questions[actualQuestion];
    const baseScore = 10;

    if (value === 'correct-answer') {
      const difficultyScore = scoreHelper(difficulty);
      const score = baseScore * timer * difficultyScore;
      update(score);
    }
    this.setState({ timer: 0, result: true });
  };

  nextButtonHelper = () => {
    const { actualQuestion, questions } = this.state;
    const { history } = this.props;
    const lastQuestion = 4;
    if (actualQuestion >= lastQuestion) {
      history.push('/feedback');
    } else {
      const incorrectAnswers = questions[actualQuestion + 1].incorrect_answers;
      const correctAnswers = questions[actualQuestion + 1].correct_answer;
      const answers = createAnswersArray(correctAnswers, incorrectAnswers);
      this.cronometro();
      this.setState((prevState) => ({
        actualQuestion: prevState.actualQuestion + 1,
        answers,
        result: false,
      }));
    }
  };

  nextButtonHandler = () => {
    this.nextButtonHelper();
  };

  fetchQuestions = async () => {
    const { history } = this.props;
    const errorCode = 3;
    const sucessCode = 0;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    if (questions.response_code === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    } else if (questions.response_code === sucessCode) {
      const incorrectAnswers = questions.results[0].incorrect_answers;
      const correctAnswers = questions.results[0].correct_answer;
      const answers = createAnswersArray(correctAnswers, incorrectAnswers);
      this.setState({ questions: questions.results, isLoading: false, answers });
    }
  };

  render() {
    const { questions, actualQuestion, isLoading, answers, result, timer } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
        <section className="box">
          {isLoading ? (<img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="loading" />) : (
            <QuestionCard
              className="question"
              data={ questions[actualQuestion] }
              handleAnswer={ this.handleAnswer }
              answers={ answers }
              result={ result }
              timer={ timer }
              actualQuestion={ actualQuestion }
              nextButtonHandler={ this.nextButtonHandler }
            />)}
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape().isRequired,
  update: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  update: (data) => dispatch(updateScore(data)),
});

export default connect(null, mapDispatchToProps)(Game);
