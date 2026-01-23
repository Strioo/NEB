import { Component, createSignal, For } from 'solid-js';
import { Container, Tabs, LazyImage } from '../components';
import { text } from '../constants/text';

interface TutorialStep {
  number: number;
  text: string;
  image?: string;
  note?: string;
}

const Tutorial: Component = () => {
  const [activeTab, setActiveTab] = createSignal('install');

  // Tab 1: Install ModHeader (3 langkah)
  const installSteps = (): TutorialStep[] => [
    {
      number: 1,
      text: text.tutorial.installStep1,
      image: '/assets/tutorial/install-step1.png'
    },
    {
      number: 2,
      text: text.tutorial.installStep2,
      image: '/assets/tutorial/install-step2.png'
    },
    {
      number: 3,
      text: text.tutorial.installStep3,
      image: '/assets/tutorial/install-step3.png'
    }
  ];

  // Tab 2: Redeem Token (4 langkah + intro)
  const redeemSteps = (): TutorialStep[] => [
    {
      number: 0,
      text: text.tutorial.redeemIntro,
      note: text.tutorial.redeemExampleToken
    },
    {
      number: 1,
      text: text.tutorial.redeemStep1,
      image: '/assets/tutorial/redeem-step1.png'
    },
    {
      number: 2,
      text: text.tutorial.redeemStep2,
      image: '/assets/tutorial/redeem-step2.png'
    },
    {
      number: 3,
      text: text.tutorial.redeemStep3,
      image: '/assets/tutorial/redeem-step3.png'
    },
    {
      number: 4,
      text: text.tutorial.redeemStep4,
      image: '/assets/tutorial/redeem-step4.png'
    }
  ];

  // Tab 3: How to Use (3 langkah + intro + final)
  const useSteps = (): TutorialStep[] => [
    {
      number: 0,
      text: text.tutorial.useIntro
    },
    {
      number: 1,
      text: text.tutorial.useStep1,
      image: '/assets/tutorial/use-step1.png'
    },
    {
      number: 2,
      text: text.tutorial.useStep2,
      image: '/assets/tutorial/use-step2.png'
    },
    {
      number: 3,
      text: text.tutorial.useStep3,
      image: '/assets/tutorial/use-step3.png'
    },
    {
      number: 0,
      text: text.tutorial.useFinal
    }
  ];

  const tabs = () => [
    { key: 'install', label: text.tutorial.installTab, value: 'install' },
    { key: 'redeem', label: text.tutorial.redeemTab, value: 'redeem' },
    { key: 'use', label: text.tutorial.useTab, value: 'use' }
  ];

  const renderSteps = (steps: TutorialStep[], note?: string) => (
    <div class="space-y-6 sm:space-y-8">
      <For each={steps}>
        {(step) => (
          <div class="space-y-3 sm:space-y-4">
            {/* Step Text */}
            <div class="flex items-start gap-3 sm:gap-4">
              {step.number > 0 && (
                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  {step.number}
                </div>
              )}
              <div class="flex-1 pt-1 sm:pt-2">
                <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {step.text}
                </p>
                
                {/* Optional Note (for example token) */}
                {step.note && (
                  <div class="mt-3 p-3 sm:p-4 bg-gray-100 rounded-lg border border-gray-200">
                    <p class="text-xs sm:text-sm font-mono text-gray-700 break-all">{step.note}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Step Image */}
            {step.image && (
              <div class={step.number > 0 ? "ml-0 sm:ml-14" : ""}>
                <LazyImage 
                  src={step.image} 
                  alt={`Tutorial step ${step.number > 0 ? step.number : 'intro'}`}
                  class="shadow-sm"
                  aspectRatio="16/9"
                />
              </div>
            )}
          </div>
        )}
      </For>

      {/* Final Note */}
      {note && (
        <div class="p-4 sm:p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <div class="flex items-start gap-2 sm:gap-3">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="text-xs sm:text-sm font-semibold text-blue-900 mb-1">Note:</p>
              <p class="text-xs sm:text-sm text-blue-800 leading-relaxed">{note}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <section class="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <Container>
          <div class="max-w-3xl mx-auto text-center px-4">
            <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-50 rounded-full mb-4">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span class="text-[10px] sm:text-xs font-semibold text-primary-600 uppercase tracking-wider">
                Tutorial Guide
              </span>
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              {text.tutorial.title}
            </h1>
            <p class="text-base sm:text-lg text-gray-500 leading-relaxed">
              {text.tutorial.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Tutorial Content with Tabs */}
      <section class="py-12 bg-white">
        <Container>
          <div class="max-w-4xl mx-auto">
            <Tabs 
              tabs={tabs()} 
              activeTab={activeTab()} 
              onTabChange={setActiveTab}
            >
              {/* Tab 1: Install ModHeader */}
              {activeTab() === 'install' && renderSteps(installSteps(), text.tutorial.installNote)}
              
              {/* Tab 2: Redeem Token */}
              {activeTab() === 'redeem' && renderSteps(redeemSteps(), text.tutorial.redeemNote)}
              
              {/* Tab 3: How to Use */}
              {activeTab() === 'use' && renderSteps(useSteps(), text.tutorial.useNote)}
            </Tabs>
          </div>
        </Container>
      </section>

      {/* Help Section */}
      <section class="py-12 bg-gray-50">
        <Container>
          <div class="max-w-2xl mx-auto">
            <div class="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{text.tutorial.needHelp}</h3>
              <p class="text-gray-600 mb-6">
                {text.tutorial.needHelpDesc}
              </p>
              <a 
                href="/contact"
                class="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                {text.tutorial.contactUs}
                <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Tutorial;
