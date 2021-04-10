import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './components/Footer';
import MangaPreview from './components/MangaPreview';

test('renders learn react link', () => {
  render(<MangaPreview />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
