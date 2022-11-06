const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_USER_DATA':
    return ({ ...state,
      name: action.payload.nome,
      gravatarEmail: action.payload.email,
    });
  case 'UPDATE_SCORE':
    return ({ ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    });
  case 'RESET_SCORE':
    return ({
      ...state,
      score: 0,
      assertions: 0,
    });
  default:
    return state;
  }
}

export default player;
