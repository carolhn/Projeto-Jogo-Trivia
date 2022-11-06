import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testar se existe uma pagina Login', () => {
    it('Testar se existe um input de nome', () => {
      renderWithRouterAndRedux(<App />);
  
      const nome = screen.getByPlaceholderText(/digite seu nome/i);
      expect(nome).toBeInTheDocument();
    });
  });

  describe('Testar se existe na pagina Login', () => {
    it('Testar se existe um input de email', () => {
      renderWithRouterAndRedux(<App />);
  
      const email = screen.getByPlaceholderText(/digite seu email/i);
      expect(email).toBeInTheDocument();
    });
  });
  
    describe('Testar se existe na pagina Login', () => {
    it('Testar se o button play direciona para /game', () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          token:
            '5611ab2473d33515d8cbe1856ba6a10f776b46bfe7771a14ce8e3b25e7b8bec2',
        }),
      });

      const { history } = renderWithRouterAndRedux(<App />);
      
      const email = screen.getByPlaceholderText(/digite seu email/i);
      userEvent.type(email, 'teste@teste.com');

      const nome = screen.getByPlaceholderText(/digite seu nome/i);
      userEvent.type(nome, 'trybe');

      const button = screen.getByRole('button', { name: /play/i })
      expect(button).toBeInTheDocument();
      userEvent.click(button)
      
      expect(history.location.pathname).toBe('/');
      expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
    });
  });
  

  describe('Testar o botão configurações', () => {
    it('Testar se o button configurações direciona para /setings', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      
      const buttonConfig =   screen.getByRole('button', { name: /configurações/i })
      userEvent.click(buttonConfig);
      expect(history.location.pathname).toBe('/settings');

      const pagConfig = screen.getByRole('heading', { name: /configurações/i })
      expect(pagConfig).toBeDefined();
    });
  });

  describe('Testar a pagina principal', () => {
    it('Testar se a pagina tem rota /', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      expect(history.location.pathname).toBe('/');
    });
  });
