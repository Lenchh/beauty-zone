export interface ISpecialist {
  id: number;
  name: string;
  surname: string;
  specialty: string;
  experience: string;
  description: string;
  imgUrl: string;
}

export const specialists: ISpecialist[] = [
  {
    id: 1,
    name: 'Олена',
    surname: 'Коваль',
    specialty: 'Лікар-косметолог',
    experience: '8 років',
    description: "Експерт з апаратної косметології та антивікових програм. Допоможе вашій шкірі сяяти здоров'ям.",
    imgUrl: '/beauty-zone/src/assets/AboutPage/specialists/olenaK.webp',
  },
  {
    id: 2,
    name: 'Ірина',
    surname: 'Павленко',
    specialty: 'SPA-естетист по тілу',
    experience: '7 років',
    description: 'Спеціаліст з обгортань, скрабування та комплексних релакс-програм для всього тіла.',
    imgUrl: '/beauty-zone/src/assets/AboutPage/specialists/iryna.webp',
  },
  {
    id: 3,
    name: 'Марія',
    surname: 'Ткаченко',
    specialty: 'Майстер нігтьового сервісу',
    experience: '4 роки',
    description: 'Створює ідеальний манікюр та педикюр. Спеціалізується на складному дизайні та SPA-догляді за руками.',
    imgUrl: '/beauty-zone/src/assets/AboutPage/specialists/maria.webp',
  },
  {
    id: 4,
    name: 'Вікторія',
    surname: 'Шевченко',
    specialty: 'Lash & Brow майстер',
    experience: '3 роки',
    description:
      'Провідний спеціаліст Beauty Zone з ламінування вій та архітектури брів. Підкреслить вашу природну красу.',
    imgUrl: '/beauty-zone/src/assets/AboutPage/specialists/victoria.webp',
  },
  {
    id: 5,
    name: 'Софія',
    surname: 'Мельник',
    specialty: 'Hair-стиліст',
    experience: '6 років',
    description: 'Майстер зі складного фарбування та відновлювальних SPA-процедур для волосся.',
    imgUrl: '/beauty-zone/src/assets/AboutPage/specialists/sofia.webp',
  },
  {
    id: 6,
    name: 'Олена',
    surname: 'Бойко',
    specialty: 'Масажист-реабілітолог',
    experience: '5 років',
    description:
      'Володіє техніками розслаблюючого, лікувального та антицелюлітного масажу. Знімає стрес та напругу за один сеанс.',
    imgUrl: '/beauty-zone/src/assets/AboutPage/specialists/olenaB.webp',
  },
];
