export interface ServiceBenefit {
  text: string;
  badge: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
  badge?: string;
  benefits: ServiceBenefit[];
  isMain?: boolean;
  comingSoon?: boolean;
}

export const mainService: Service = {
  id: 'safe-exam-browser',
  name: 'Safe Exam Browser',
  description: 'Bypass Safe Exam Browser restrictions seamlessly',
  icon: '🌐',
  badge: 'Most Popular',
  isMain: true,
  benefits: [
    { text: 'Bypass Safe Exam Browser restrictions', badge: 'Seamless' },
    { text: 'Switch between applications freely', badge: 'Supported' },
    { text: 'Quick and reliable results', badge: 'Instant' },
  ],
};

export const comingSoonServices: Service[] = [
  {
    id: 'kahoot',
    name: 'Kahoot',
    description: 'Automated answers and bot support coming soon',
    icon: '🎯',
    benefits: [],
    comingSoon: true,
  },
  {
    id: 'quizizz',
    name: 'Quizizz',
    description: 'Automated answers and bot support coming soon',
    icon: '⚡',
    benefits: [],
    comingSoon: true,
  },
];

export const allServices = [mainService, ...comingSoonServices];
