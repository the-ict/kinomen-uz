import {
  Film,
  Star,
  Users,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Info,
  LogIn,
  Clapperboard,
  Sparkles,
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
        url: '/movies?sort=popular',
      },
      {
        title: 'Yangi chiqqanlar',
        description: 'Yangi premyeralar va yaqinda qo‘shilgan filmlar',
        icon: Clapperboard,
        url: '/movies?sort=new',
      },
      {
        title: 'Eng yuqori baholangan',
        description: 'Foydalanuvchilar reytingi bo‘yicha top 100 film',
        icon: Sparkles,
        url: '/movies?sort=most_rated',
      },
      {
        title: 'Filtrlash',
        description: 'Drama, fantastika, komediya va boshqa toifalar',
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
      {
        title: 'Yangiliklar',
        description: 'So‘nggi kino yangiliklari va intervyular',
        icon: Info,
        url: '/blog/news',
      },
      {
        title: 'Reytinglar',
        description: 'Kinomen jamoasi tuzgan maxsus top ro‘yxatlar',
        icon: Star,
        url: '/blog/top-lists',
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
