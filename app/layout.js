import { Inter } from 'next/font/google';
import './globals.css';
import RootLayoutClient from './layout-client';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Chhattisgarh Basket</title>
        <meta name="description" content="Authentic tribal produce from Bastar" />
      </head>
      <body className={inter.className}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}