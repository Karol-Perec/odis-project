import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders login element', () => {
  const { getByText } = render(<App />);

  const loginElement = getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
});

test('renders register elements', () => {
  const { getByText } = render(<App />);

  const registerElement = getByText(/register/i);
  expect(registerElement).toBeInTheDocument();
});

test('renders tasks elements', () => {
  const { getByText } = render(<App />);

  const tasksElement = getByText(/tasks/i);
  expect(tasksElement).toBeInTheDocument();
});

test('renders comments elements', () => {
  const { getByText } = render(<App />);

  const commentsElement = getByText(/comments/i);

  expect(commentsElement).toBeInTheDocument();
});

// test('renders secure elements', () => {
//   const { getByText } = render(<App />);

//   const secureElement = getByText(/secure/i);

//   expect(secureElement).toBeInTheDocument();
// });
