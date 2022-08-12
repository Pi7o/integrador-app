import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import Base from './index.js';

// simple test para ver si el boton esta deshabilitado inicialmente

test('Testear si boton esta deshabilitado', () => {
  render(<Base/>);
  const result = screen.getByRole('button', { id: 'boton' });
  expect(result).toHaveAttribute('disabled');
});