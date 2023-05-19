import { ReactNode } from 'react';
import './globals.css';
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as Baijamjuree,
} from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  preload: true,
  variable: '--font-roboto',
});

const baiJamjuree = Baijamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-baijamjuree',
});

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, Tailwind e typescript.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
