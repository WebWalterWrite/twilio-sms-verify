import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders title page', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/TWILIO-SMS-VERIFY/i);
  expect(titleElement).toBeInTheDocument();
});
