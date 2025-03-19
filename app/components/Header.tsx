'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-light/10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/admin.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-primary-500/30"
            />
            <span className="text-2xl font-bold">
              <span className="text-light">Abdellah</span>
              <span className="text-primary-400">ElBerkaoui</span>
            </span>
          </Link>
          // ... rest of the existing code ...
        </div>
      </nav>
    </header>
  );
};

export default Header; 