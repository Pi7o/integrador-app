import { render, screen } from '@testing-library/react';
import App from './App';

test('Testeo del Header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Buscador con NewsApi de pi7/i);
  expect(linkElement).toBeInTheDocument();
});
