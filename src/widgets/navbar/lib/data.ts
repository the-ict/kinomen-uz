import {
  Film,
  Star,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Info,
} from 'lucide-react';
import { MenuItem } from './model';
import { LanguageRoutes } from '@/shared/config/i18n/types';

const menu: MenuItem[] = [
  {
    title: 'Filmlar',
    url: '#',
    items: [
      {
        title: 'Ommabop filmlar',
        description: 'Hozir eng ko‘p muhokama qilinayotgan kinolar',
        icon: Star,
        url: '/#movies',
      },
      {
        title: 'Filtrlash',
        description: 'Turi, Nomi, Yili va boshqa toifalar',
        icon: Film,
        url: '/movies?sort=genre',
      },
    ],
  },
  {
    title: 'Blog',
    url: '#',
    items: [
      {
        title: 'Tahlillar',
        description: 'Kino olamidagi chuqur tahlillar va maqolalar',
        icon: BookOpen,
        url: '/analyses',
      },
    ],
  },
  {
    title: 'Yordam',
    url: '#',
    items: [
      {
        title: 'Savol-javoblar',
        description: 'Ko‘p so‘raladigan savollarga javoblar',
        icon: HelpCircle,
        url: '/help/faq',
      },
      {
        title: 'Qo‘llab-quvvatlash',
        description: 'Bizga murojaat qiling yoki xabar yuboring',
        icon: MessageSquare,
        url: '/help/support',
      },
      {
        title: 'Shartlar va siyosat',
        description: 'Platformadan foydalanish qoidalari',
        icon: Info,
        url: '/help/terms',
      },
      {
        title: 'Maxfiylik siyosati',
        description: "Shaxsiy ma'lumotlarning himoya qoidalari",
        icon: Info,
        url: '/help/policy',
      },
    ],
  },
];

const authedMenu: MenuItem[] = [
  {
    title: 'Yoqtirganlarim',
    url: '/favorites',
  },
  {
    title: 'Watch-list',
    url: '/watchlist',
  },
  {
    title: 'Tahlil yaratish',
    url: '/create-analyses',
  },
];

const languages: { name: string; key: LanguageRoutes }[] = [
  {
    name: "O'zbekcha",
    key: LanguageRoutes.UZ,
  },
  {
    name: 'Ўзбекча',
    key: LanguageRoutes.KI,
  },
  {
    name: 'Русский',
    key: LanguageRoutes.RU,
  },
];

export { menu, languages, authedMenu };
