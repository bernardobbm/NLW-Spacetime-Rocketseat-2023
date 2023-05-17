import { ReactNode } from 'react';
import './globals.css';
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as Baijamjuree,
} from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' });

const baijamjuree = Baijamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
});

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, Tailwind e typescript.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} ${baijamjuree.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
