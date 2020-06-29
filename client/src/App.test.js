import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders title page', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/TwilioSmsVerify/i);
  expect(titleElement).toBeInTheDocument();
});
