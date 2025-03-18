import React from 'react';
import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Initialize font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Abdellah Elberkaoui | Mechatronics Engineer',
  description: 'Portfolio of Abdellah Elberkaoui, a 4th year Mechatronics Engineering student at ENSA Tetouan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 