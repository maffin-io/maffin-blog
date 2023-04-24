import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/images/logo.png';
import Footer from '@/components/Footer';
import '@/css/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Maffin Blog',
  description: 'A bit of everything engineering, travel and finance',
};

const headerNavLinks = [
  { href: '/', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/about', title: 'About' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <div className="flex h-screen flex-col justify-between">
            <header className="flex items-center justify-between py-10">
              <div>
                <Link href="/" aria-label="MaffinBlog">
                  <div className="flex items-center justify-between">
                    <Image src={Logo} alt="Logo" width={70} />
                    <div className="hidden h-6 text-2xl font-semibold sm:block">
                      MaffinBlog
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex items-center text-base leading-5">
                <div className="hidden sm:block">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </header>
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
