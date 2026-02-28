import type { JSX } from 'react';
import { Header } from '../Home/components/Header/Header';
import aboutStyle from './about.module.scss';

export function AboutPage(): JSX.Element {
  return (
    <div className={aboutStyle.container}>
      <Header />
    </div>
  );
}
