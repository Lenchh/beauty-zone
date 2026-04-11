import type { JSX } from 'react';
import { Header } from '../Home/components/Header/Header';
import profileStyle from './userProfile.module.scss';

export function UserProfile(): JSX.Element {
  return (
    <div className={profileStyle.userProfile}>
      <Header />
    </div>
  );
}
