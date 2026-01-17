export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'about',
    question: 'What is NEB all about?',
    answer: 'NEB is your ultimate companion for tackling online exams and assignments. With cutting-edge tools, we ensure you get accurate answers quickly and effortlessly.',
  },
  {
    id: 'payment',
    question: 'Do I need to pay for this service?',
    answer: 'NEB offers both free and premium features. Basic functionality is available at no cost, while advanced features may require a subscription for the best experience.',
  },
  {
    id: 'simplify',
    question: 'How does NEB simplify my life?',
    answer: 'NEB automates the process of finding answers for your online exams and assignments. Simply follow our easy setup guide, and you\'ll be ready to go in minutes.',
  },
  {
    id: 'security',
    question: 'Is NEB safe and secure?',
    answer: 'Absolutely! We prioritize your privacy and security. NEB operates discreetly and doesn\'t store any of your personal exam data.',
  },
];
