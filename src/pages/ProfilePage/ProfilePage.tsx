import { useEffect, useState, type JSX } from 'react';
import { Header } from '../../common/components/Header/Header';
import { Footer } from '../../common/components/Footer/Footer';
import profileStyle from './profile.module.scss';
import { EditInfoForm } from './components/EditInfoForm';
import type { IUser } from '../../common/interfaces/IUser';
import { VisitHistoryComponent } from './components/VisitHistoryComponent';
import { useAppSelector } from '../../featchers/hooks';

export function ProfilePage(): JSX.Element {
  const userAcc = useAppSelector((state) => state.auth.userInfo);
  const [userInfo, setUserInfo] = useState<IUser>({
    id: userAcc?.id || '',
    name: userAcc?.name || '',
    surname: userAcc?.surname || '',
    phone: userAcc?.phone || '',
    email: userAcc?.email || '',
  });

  useEffect(() => {
    if (userAcc && userInfo.id === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserInfo({
        id: userAcc.id,
        name: userAcc.name,
        surname: userAcc.surname,
        phone: userAcc.phone,
        email: userAcc.email!,
      });
    }
  }, [userAcc]);

  return (
    <div className={profileStyle.profilePage}>
      <Header />
      <div className={profileStyle.userInfoContainer}>
        <h2 className={profileStyle.headerText}>
          Мій <span className="bold-blue">профіль</span>
        </h2>
        <EditInfoForm userInfo={userInfo} oldUserInfo={userAcc!} setUserInfo={setUserInfo} />
      </div>
      <h2 className={profileStyle.headerText}>Історія записів</h2>
      <VisitHistoryComponent />
      <Footer />
    </div>
  );
}
