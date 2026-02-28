interface ISpecialist {
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
    name: 'Анна',
    surname: 'Коваленко',
    specialty: 'Лікар-косметолог',
    experience: '8 років',
    description: "Експерт з апаратної косметології та антивікових програм. Допоможе вашій шкірі сяяти здоров'ям.",
    imgUrl: '/images/specialists/anna.jpg',
  },
  {
    id: 2,
    name: 'Олена',
    surname: 'Бойко',
    specialty: 'Масажист-реабілітолог',
    experience: '5 років',
    description:
      'Володіє техніками розслаблюючого, лікувального та антицелюлітного масажу. Знімає стрес та напругу за один сеанс.',
    imgUrl: '/images/specialists/olena.jpg',
  },
  {
    id: 3,
    name: 'Марія',
    surname: 'Ткаченко',
    specialty: 'Майстер нігтьового сервісу',
    experience: '4 роки',
    description: 'Створює ідеальний манікюр та педикюр. Спеціалізується на складному дизайні та SPA-догляді за руками.',
    imgUrl: '/images/specialists/mariia.jpg',
  },
  {
    id: 4,
    name: 'Вікторія',
    surname: 'Шевченко',
    specialty: 'Lash & Brow майстер',
    experience: '3 роки',
    description:
      'Провідний спеціаліст Beauty Zone з ламінування вій та архітектури брів. Підкреслить вашу природну красу.',
    imgUrl: '/images/specialists/viktoriia.jpg',
  },
  {
    id: 5,
    name: 'Софія',
    surname: 'Мельник',
    specialty: 'Hair-стиліст',
    experience: '6 років',
    description: 'Майстер зі складного фарбування та відновлювальних SPA-процедур для волосся.',
    imgUrl: '/images/specialists/sofiia.jpg',
  },
  {
    id: 6,
    name: 'Ірина',
    surname: 'Павленко',
    specialty: 'SPA-естетист по тілу',
    experience: '7 років',
    description: 'Спеціаліст з обгортань, скрабування та комплексних релакс-програм для всього тіла.',
    imgUrl: '/images/specialists/iryna.jpg',
  },
];
