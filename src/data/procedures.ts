import relaxMassage from '../assets/ProcedurePage/relaxMassage.webp';
import anticellulite from '../assets/ProcedurePage/anticellulite.webp';
import faceCleaning from '../assets/ProcedurePage/faceCleaning.webp';
import peeling from '../assets/ProcedurePage/peeling.webp';
import lipInjection from '../assets/ProcedurePage/lipInjection.webp';
import botox from '../assets/ProcedurePage/botox.webp';
import lashes from '../assets/ProcedurePage/lashes.webp';
import eyelashExtension from '../assets/ProcedurePage/eyelashExtension.webp';
import spaManicure from '../assets/ProcedurePage/spaManicure.webp';
import pedicure from '../assets/ProcedurePage/pedicure.webp';
import keratin from '../assets/ProcedurePage/keratin.webp';
import hairColoring from '../assets/ProcedurePage/hairColoring.webp';
import alginateMask from '../assets/ProcedurePage/alginateMask.webp';
import clayMask from '../assets/ProcedurePage/clayMask.webp';

export interface IProcedure {
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
    imgUrl: relaxMassage,
  },
  {
    id: 2,
    title: 'Антицелюлітний масаж',
    description:
      'Інтенсивний масаж проблемних зон для покращення кровообігу, лімфодренажу, вирівнювання рельєфу та корекції фігури.',
    price: 900,
    duration: '60 хв',
    category: 'Масаж',
    imgUrl: anticellulite,
  },
  {
    id: 3,
    title: 'Ультразвукова чистка обличчя',
    description: 'Бережне апаратне очищення шкіри, звуження пор та вирівнювання тону без почервонінь.',
    price: 700,
    duration: '45 хв',
    category: 'Косметологія',
    imgUrl: faceCleaning,
  },
  {
    id: 4,
    title: 'Мультикислотний пілінг',
    description:
      'Делікатне відлущування ороговілих клітин, оновлення шкіри, зменшення пігментації та розгладження дрібних зморшок.',
    price: 850,
    duration: '40 хв',
    category: 'Косметологія',
    imgUrl: peeling,
  },
  {
    id: 5,
    title: 'Контурна пластика губ',
    description:
      "Корекція форми та збільшення об'єму губ за допомогою філерів на основі гіалуронової кислоти. Максимально природний результат.",
    price: 4500,
    duration: '60 хв',
    category: "Ін'єкційна косметологія",
    imgUrl: lipInjection,
  },
  {
    id: 6,
    title: 'Ботулінотерапія (усунення зморшок)',
    description:
      "Безпечна та ефективна процедура для розгладження мімічних зморшок на лобі, у зоні міжбрів'я та навколо очей.",
    price: 3200,
    duration: '45 хв',
    category: "Ін'єкційна косметологія",
    imgUrl: botox,
  },
  {
    id: 7,
    title: 'Ламінування вій та брів',
    description: 'Створення ідеального вигину вій та архітектура брів з використанням живильних сироваток.',
    price: 650,
    duration: '60 хв',
    category: "Б'юті-послуги",
    imgUrl: lashes,
  },
  {
    id: 8,
    title: 'Класичне нарощування вій',
    description:
      'Додавання довжини та густоти вій. Природний та виразний погляд на кілька тижнів без необхідності використовувати туш.',
    price: 700,
    duration: '120 хв',
    category: "Б'юті-послуги",
    imgUrl: eyelashExtension,
  },
  {
    id: 9,
    title: 'SPA-манікюр з покриттям',
    description:
      'Комплексний догляд за руками: апаратний або комбінований манікюр, легкий пілінг та стійке покриття гель-лаком.',
    price: 550,
    duration: '120 хв',
    category: 'Нігтьовий сервіс',
    imgUrl: spaManicure,
  },
  {
    id: 10,
    title: 'Апаратний педикюр',
    description: 'Безпечна обробка стоп та нігтів, видалення огрубілої шкіри, масаж ніг та нанесення живильного крему.',
    price: 750,
    duration: '90 хв',
    category: 'Нігтьовий сервіс',
    imgUrl: pedicure,
  },
  {
    id: 11,
    title: 'Кератинове відновлення',
    description:
      'Інтенсивне живлення та випрямлення. Надає волоссю дзеркальний блиск, гладкість та захист на кілька місяців.',
    price: 1800,
    duration: '150 хв',
    category: 'Волосся',
    imgUrl: keratin,
  },
  {
    id: 12,
    title: 'Складне фарбування',
    description:
      'Трендові техніки (Airtouch, Balayage, Шатуш) зі збереженням якості волосся завдяки преміальним барвникам.',
    price: 2500,
    duration: '180 хв',
    category: 'Волосся',
    imgUrl: hairColoring,
  },
  {
    id: 13,
    title: 'Альгінатна маска "Глибоке зволоження"',
    description: 'На основі екстракту морських водоростей. Миттєво зволожує шкіру, знімає набряки, покращує кровообіг.',
    price: 850,
    duration: '40 хв',
    category: 'Маски для обличчя',
    imgUrl: alginateMask,
  },
  {
    id: 14,
    title: 'Очищуюча детокс-маска з чорною глиною',
    description:
      'Для жирної та комбінованої шкіри. Глибоко очищує пори, ефективно бореться з висипаннями, регулює виділення себуму та вирівнює тон обличчя.',
    price: 700,
    duration: '35 хв',
    category: 'Маски для обличчя',
    imgUrl: clayMask,
  },
];
