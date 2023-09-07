import { seedDb } from '@/libs/db';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

let is_seeded = false;

const seed = async () => {
  if (is_seeded) return;
  await seedDb();
  is_seeded = true;
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard - Users',
  description: 'A dashboard for managing users.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  if (!is_seeded) {
    await seed();
  }

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
