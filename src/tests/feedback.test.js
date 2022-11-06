import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testar se existe uma pagina Feedback', () => {
    it('Testar se existe na tela', () => {
      const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

     const img = screen.getByRole('img', { name: /imagem de perfil/i });
     expect(img).toBeInTheDocument();

     const acertos = screen.getByText(/could be better\.\.\./i)
     expect(acertos).toBeInTheDocument();

      const argain = screen.getByRole('button', { name: /play again/i });
      expect(argain).toBeInTheDocument();
      userEvent.click(argain)
      expect(history.location.pathname).toBe('/');
    });
  });
