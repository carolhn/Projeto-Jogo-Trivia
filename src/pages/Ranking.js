import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  state = {
    isLoading: true,
    scores: [],
  };

  componentDidMount() {
    this.getScores();
  }

  getScores = () => {
    const scores = JSON.parse(localStorage.getItem('ranking'));
    if (scores !== null) {
      this.setState({ scores, isLoading: false });
    }
  };

  render() {
    const { history } = this.props;
    const { scores, isLoading } = this.state;
    return (
      <section>
        <header className="header">
          <button
            data-testid="btn-go-home"
            type="button"
            className="button-home"
            onClick={ () => history.push('/') }
          >
            Home
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            className="button-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </header>
        <h1 data-testid="ranking-title">Ranking</h1>
        { isLoading ? <p>Carregando...</p> : (
          <div>
            {
              scores.map(({ name, score, image }, index) => (
                <div key={ index }>
                  <img src={ image } alt={ name } />
                  <p
                    data-testid="player-name"
                  >
                    { name }

                  </p>
                  <p
                    data-testid="player-score"
                  >
                    { score }

                  </p>
                </div>
              ))
            }
          </div>)}
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};
