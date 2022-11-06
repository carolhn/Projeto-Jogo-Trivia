import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserData } from '../redux/actions';

class Login extends React.Component {
  state = {
    nome: '',
    email: '',
  };

  onHandleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  submitHandler = async (event) => {
    event.preventDefault();
    const { history, saveData } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const payload = await response.json();
    const payloadToken = payload.token;
    localStorage.setItem('token', payloadToken);
    saveData(this.state);
    history.push('/game');
  };

  playButtonHandler = () => {
    const { nome, email } = this.state;
    const tamanhoDoNome = nome.length;
    const tamanhoDoEmail = email.length;

    return !(tamanhoDoNome && tamanhoDoEmail);
  };

  render() {
    const { nome, email } = this.state;
    const { history } = this.props;
    return (
      <section>
        <form
          className="form-login"
          onSubmit={ this.submitHandler }
        >
          <img className="img" src="https://upload.wikimedia.org/wikipedia/en/2/27/Trivia.png" alt="imagemlogin" />

          <label htmlFor="nome">
            <input
              id="nome"
              type="text"
              className="inputNome"
              placeholder="Digite seu nome"
              value={ nome }
              onChange={ this.onHandleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            <input
              id="email"
              type="email"
              className="input-email"
              placeholder="Digite seu Email"
              value={ email }
              onChange={ this.onHandleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            className="button-login"
            type="submit"
            disabled={ this.playButtonHandler() }
            data-testid="btn-play"
          >
            Play
          </button>
          <button
            className="button-config"
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
  saveData: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  saveData: (state) => dispatch(saveUserData(state)),
});

export default connect(null, mapDispatchToProps)(Login);
