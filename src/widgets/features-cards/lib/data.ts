import { MessageSquare, Film, Star, Users, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Film,
    title: 'Eng so‘nggi filmlar',
    description:
      'Yangi va mashhur kinolarni kashf eting, treylerlarni ko‘ring va o‘zingizga yoqqanlarini ro‘yxatga qo‘shing.',
  },
  {
    icon: MessageSquare,
    title: 'Fikr yozing',
    description:
      'Tomosha qilgan filmlaringiz haqida o‘z fikrlaringizni yozing va boshqa foydalanuvchilar bilan fikr almashing.',
  },
  {
    icon: Star,
    title: 'Baholash tizimi',
    description:
      'Filmlarni yulduzcha bilan baholang, shu orqali eng mashhur kinolar ro‘yxatini shakllantiramiz.',
  },
  {
    icon: Users,
    title: 'Kinosevarlar jamoasi',
    description:
      'Siz kabi kinoni sevuvchi odamlar bilan birlashib, qiziqarli suhbatlar va tavsiyalar toping.',
  },
];

export { features };
