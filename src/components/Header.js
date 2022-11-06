import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

class Header extends Component {
  PerfilDeUsuario = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  render() {
    const { nome, score, history } = this.props;
    return (
      <header className="header">
        <img
          className="imgProfile"
          data-testid="header-profile-picture"
          src={ this.PerfilDeUsuario() }
          alt="Imagem de perfil"
        />
        <p className="name" data-testid="header-player-name">{`Nome: ${nome}`}</p>
        <p data-testid="header-score">{`Pontos: ${score}`}</p>
        <div className="botao-header">
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
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,

});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};
export default connect(mapStateToProps, null)(Header);
