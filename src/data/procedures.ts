interface IProcedure {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  imgUrl: string;
}

export const procedures: IProcedure[] = [
  {
    id: 1,
    title: 'Авторський релакс-масаж',
    description: "Глибоке розслаблення м'язів та зняття стресу за допомогою теплих ароматичних масел.",
    price: 850,
    duration: '60 хв',
    category: 'Масаж',
    imgUrl: '/images/procedures/relax-massage.jpg',
  },
  {
    id: 2,
    title: 'Антицелюлітний масаж',
    description:
      'Інтенсивний масаж проблемних зон для покращення кровообігу, лімфодренажу, вирівнювання рельєфу та корекції фігури.',
    price: 900,
    duration: '60 хв',
    category: 'Масаж',
    imgUrl: '/images/procedures/anticellulite.jpg',
  },
  {
    id: 3,
    title: 'Ультразвукова чистка обличчя',
    description: 'Бережне апаратне очищення шкіри, звуження пор та вирівнювання тону без почервонінь.',
    price: 700,
    duration: '45 хв',
    category: 'Косметологія',
    imgUrl: '/images/procedures/face-cleaning.jpg',
  },
  {
    id: 4,
    title: 'Мультикислотний пілінг',
    description:
      'Делікатне відлущування ороговілих клітин, оновлення шкіри, зменшення пігментації та розгладження дрібних зморшок.',
    price: 850,
    duration: '40 хв',
    category: 'Косметологія',
    imgUrl: '/images/procedures/peeling.jpg',
  },
  {
    id: 5,
    title: 'SPA-ритуал "Шоколадна насолода"',
    description: 'Комплексний догляд: кавовий скраб, шоколадне обгортання та легкий зволожуючий масаж.',
    price: 1200,
    duration: '90 хв',
    category: 'Тіло',
    imgUrl: '/images/procedures/choco-wrap.jpg',
  },
  {
    id: 6,
    title: 'Детокс-обгортання з водоростями',
    description:
      'Процедура для виведення токсинів, глибокого зволоження шкіри та підвищення її тонусу. Ідеально для розслаблення та корекції фігури.',
    price: 1100,
    duration: '80 хв',
    category: 'Тіло',
    imgUrl: '/images/procedures/algae-wrap.jpg',
  },
  {
    id: 7,
    title: 'Ламінування вій та брів',
    description: 'Створення ідеального вигину вій та архітектура брів з використанням живильних сироваток.',
    price: 650,
    duration: '60 хв',
    category: "Б'юті-послуги",
    imgUrl: '/images/procedures/lashes.jpg',
  },
  {
    id: 8,
    title: 'Класичне нарощування вій',
    description:
      'Додавання довжини та густоти вій. Природний та виразний погляд на кілька тижнів без необхідності використовувати туш.',
    price: 700,
    duration: '120 хв',
    category: "Б'юті-послуги",
    imgUrl: '/images/procedures/eyelash-extension.jpg',
  },
  {
    id: 9,
    title: 'SPA-манікюр з покриттям',
    description:
      'Комплексний догляд за руками: апаратний або комбінований манікюр, легкий пілінг та стійке покриття гель-лаком.',
    price: 550,
    duration: '120 хв',
    category: 'Нігтьовий сервіс',
    imgUrl: '/images/procedures/spa-manicure.jpg',
  },
  {
    id: 10,
    title: 'Апаратний педикюр',
    description: 'Безпечна обробка стоп та нігтів, видалення огрубілої шкіри, масаж ніг та нанесення живильного крему.',
    price: 750,
    duration: '90 хв',
    category: 'Нігтьовий сервіс',
    imgUrl: '/images/procedures/pedicure.jpg',
  },
  {
    id: 11,
    title: 'Кератинове відновлення',
    description:
      'Інтенсивне живлення та випрямлення. Надає волоссю дзеркальний блиск, гладкість та захист на кілька місяців.',
    price: 1800,
    duration: '150 хв',
    category: 'Волосся',
    imgUrl: '/images/procedures/keratin.jpg',
  },
  {
    id: 12,
    title: 'Складне фарбування',
    description:
      'Трендові техніки (Airtouch, Balayage, Шатуш) зі збереженням якості волосся завдяки преміальним барвникам.',
    price: 2500,
    duration: '180 хв',
    category: 'Волосся',
    imgUrl: '/images/procedures/hair-coloring.jpg',
  },
];
