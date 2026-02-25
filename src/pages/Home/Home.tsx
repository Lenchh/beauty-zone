import type { JSX } from 'react';
import { Header } from './components/Header/Header';
import { Intro } from './components/Intro/Intro';
import { Promo } from './components/Promo/Promo';
import { Services } from './components/Services/Services';
import { Procedures } from './components/Procedures/Procedures';
import { Contacts } from './components/Contacts/Contacts';
import { Footer } from './components/Footer/Footer';

export function Home(): JSX.Element {
  return (
    <>
      <Header />
      <Intro />
      <Promo />
      <Services />
      <Procedures />
      <Contacts />
      <Footer />
    </>
  );
}
