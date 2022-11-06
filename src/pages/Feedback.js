import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedbackHeader from '../components/FeedbackHeader';
import { resetScore } from '../redux/actions';

class Feedback extends React.Component {
  state = {
    disableButtons: false,
  };

  handleButton = ({ target: { value } }) => {
    this.setState({ disableButtons: true });
    const { name, score, reset } = this.props;
    const storedRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const rankingData = [...storedRanking, { name, score }];
    const sortedData = rankingData.sort((a, b) => b.score - a.score);
    reset();
    localStorage.setItem('ranking', JSON.stringify(sortedData));
    const { history } = this.props;
    history.push(value);
  };

  render() {
    const { disableButtons } = this.state;
    const { assertions, score, history } = this.props;
    const acertos = 3;
    return (
      <section>
        <FeedbackHeader
          history={ history }
          handleButton={ this.handleButton }
          disableButtons={ disableButtons }
        />
        <h1 data-testid="feedback-text">
          { assertions >= acertos ? 'Well Done!' : 'Could be better...'}
        </h1>
        <div>
          <p data-testid="feedback-total-question">{ assertions }</p>
          <p data-testid="feedback-total-score">{ score }</p>
        </div>
        <button
          value="/"
          type="button"
          onClick={ this.handleButton }
          data-testid="btn-play-again"
          disabled={ disableButtons }
        >
          Play Again
        </button>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetScore()),
});

Feedback.propTypes = {
  name: PropTypes.string,
  assertions: PropTypes.number,
  history: PropTypes.shape(),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
