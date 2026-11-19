import './globals.css';
import { Newsreader, Manrope } from 'next/font/google';

const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata = {
  title: 'My Business Journal — Personal Business Blog',
  description: 'Practical business, marketing, finance and personal growth notes — written honestly, for builders.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
