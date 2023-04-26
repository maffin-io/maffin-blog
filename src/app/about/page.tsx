import Image from 'next/image';

import Logo from '@/assets/images/logo.png';

export default function AboutPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          About
        </h1>
      </div>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8">
          <Image
            src={Logo}
            alt="Logo"
            width={192}
            height={192}
            className="h-48 w-48"
          />
          <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Maffin</h3>
          <div className="text-gray-500 dark:text-gray-400">
            Personal finance management
          </div>
          <div className="italic text-gray-500 dark:text-gray-400">
            made easy
          </div>
        </div>
        <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
          Maffins mission is to make personal finance easy. Loads out there manage their
          finances using their custom spreadsheets or other money management tools and
          sometimes it just works but, the moment you start adding multiple currencies,
          investments, etc. it complicates it a lot.
          {'\n'}
          Maffin differentiators are:
          {'\n'}
          <ul>
            <li>
              <b>Data is yours</b>
              . We dont host any of your data, you store your own data and we just interpret
              it in the browser, it never reaches our servers.
            </li>
            <li>
              <b>Transparency is key</b>
              . We know how private personal finance is and to prove we dont do anything weird,
              all our code is open source (in progress due to licensing). We love contributing back.
            </li>
            <li>
              <b>Data platform</b>
              . Our main goal is to provide people a way to store their personal finances and
              visualize them. Thats it. We are not going to sell you insurances or recommend
              investment products. Our money comes from the hosted platform and donations/sponsors
              (through opensource).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
