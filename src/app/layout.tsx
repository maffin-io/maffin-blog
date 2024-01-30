import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

import Logo from '@/assets/images/logo.png';
import Footer from '@/components/Footer';
import '@/css/globals.css';
import '@fontsource/inter';
import GithubIcon from '@/components/GithubIcon';

export const metadata = {
  title: 'Maffin Blog',
  description: 'maffin.io\'s engineering and finance',
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: '/favicon/apple-touch-icon.png',

  },
  category: ['technology', 'finance'],
  metadataBase: new URL('https://blog.maffin.io'),
  openGraph: {
    title: 'Maffin Blog',
    description: 'maffin.io\'s engineering and finance',
    siteName: 'Maffin Blog',
    locale: 'en-US',
    type: 'website',
  },
};

const headerNavLinks = [
  { href: '/', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/docs', title: 'Docs' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
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
                <GithubIcon />
              </div>
            </header>
            {children}
            <Footer />
          </div>
        </div>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-T24M4ZNYKM');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T24M4ZNYKM"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
