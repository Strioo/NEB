export interface TutorialStep {
  step: number;
  title: string;
  description: string;
}

export interface TutorialTab {
  key: string;
  label: string;
  title: string;
  description: string;
  steps: TutorialStep[];
  image?: string;
}

export const tutorialTabs: TutorialTab[] = [
  {
    key: 'install',
    label: 'Install ModHeader',
    title: 'How to Install ModHeader Extension',
    description: 'Get started by installing the ModHeader browser extension.',
    steps: [
      {
        step: 1,
        title: 'Open Chrome Web Store',
        description: 'Navigate to the Chrome Web Store and search for "ModHeader" extension.',
      },
      {
        step: 2,
        title: 'Add to Chrome',
        description: 'Click on "Add to Chrome" button and confirm the installation when prompted.',
      },
      {
        step: 3,
        title: 'Pin the Extension',
        description: 'Click the puzzle icon in Chrome toolbar and pin ModHeader for easy access.',
      },
    ],
    image: '/assets/tutorial-install.png',
  },
  {
    key: 'redeem',
    label: 'Redeem Code',
    title: 'How to Redeem Your Code',
    description: 'Learn how to activate your NEB access code.',
    steps: [
      {
        step: 1,
        title: 'Get Your Code',
        description: 'Purchase or receive your NEB activation code from our platform.',
      },
      {
        step: 2,
        title: 'Open NEB Dashboard',
        description: 'Go to your NEB account dashboard and find the "Redeem Code" section.',
      },
      {
        step: 3,
        title: 'Enter and Activate',
        description: 'Paste your code in the input field and click "Activate" to enable your access.',
      },
    ],
    image: '/assets/tutorial-redeem.png',
  },
  {
    key: 'usage',
    label: 'How to Use',
    title: 'How to Use NEB',
    description: 'Start using NEB to get answers for your online exams.',
    steps: [
      {
        step: 1,
        title: 'Open Your Exam',
        description: 'Navigate to your online exam platform and begin your exam as usual.',
      },
      {
        step: 2,
        title: 'Activate NEB',
        description: 'Click the ModHeader extension icon and ensure NEB profile is active.',
      },
      {
        step: 3,
        title: 'Get Answers',
        description: 'NEB will automatically detect questions and provide answers in real-time.',
      },
      {
        step: 4,
        title: 'Submit with Confidence',
        description: 'Review the suggested answers and submit your exam with confidence.',
      },
    ],
    image: '/assets/tutorial-usage.png',
  },
];
