import { Component, createSignal, For, Show } from 'solid-js';
import { Container, SectionHeader, Tabs, Card, Button } from '../components';
import { useI18n } from '../i18n';

interface TutorialStep {
  step: number;
  title: string;
  description: string;
}

interface TutorialTab {
  key: string;
  label: string;
  title: string;
  description: string;
  steps: TutorialStep[];
  image?: string;
}

const Tutorial: Component = () => {
  const { t } = useI18n();

  const tutorialTabs = (): TutorialTab[] => [
    {
      key: 'install',
      label: t().tutorial.installTab,
      title: t().tutorial.installTitle,
      description: t().tutorial.installDesc,
      steps: [
        {
          step: 1,
          title: t().tutorial.installStep1,
          description: t().tutorial.installStep1Desc,
        },
        {
          step: 2,
          title: t().tutorial.installStep2,
          description: t().tutorial.installStep2Desc,
        },
        {
          step: 3,
          title: t().tutorial.installStep3,
          description: t().tutorial.installStep3Desc,
        },
      ],
      image: '/assets/tutorial-install.png',
    },
    {
      key: 'redeem',
      label: t().tutorial.redeemTab,
      title: t().tutorial.redeemTitle,
      description: t().tutorial.redeemDesc,
      steps: [
        {
          step: 1,
          title: t().tutorial.redeemStep1,
          description: t().tutorial.redeemStep1Desc,
        },
        {
          step: 2,
          title: t().tutorial.redeemStep2,
          description: t().tutorial.redeemStep2Desc,
        },
        {
          step: 3,
          title: t().tutorial.redeemStep3,
          description: t().tutorial.redeemStep3Desc,
        },
      ],
      image: '/assets/tutorial-redeem.png',
    },
    {
      key: 'use',
      label: t().tutorial.useTab,
      title: t().tutorial.useTitle,
      description: t().tutorial.useDesc,
      steps: [
        {
          step: 1,
          title: t().tutorial.useStep1,
          description: t().tutorial.useStep1Desc,
        },
        {
          step: 2,
          title: t().tutorial.useStep2,
          description: t().tutorial.useStep2Desc,
        },
        {
          step: 3,
          title: t().tutorial.useStep3,
          description: t().tutorial.useStep3Desc,
        },
      ],
      image: '/assets/tutorial-use.png',
    },
  ];

  const [activeTab, setActiveTab] = createSignal(tutorialTabs()[0].key);

  const currentTab = () => tutorialTabs().find(tab => tab.key === activeTab()) || tutorialTabs()[0];

  return (
    <div class="section-padding">
      <Container>
        <SectionHeader 
          title={t().tutorial.title}
          subtitle={t().tutorial.subtitle}
        />

        <div class="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div class="lg:col-span-3">
            <Card>
              <Tabs
                tabs={tutorialTabs().map(tab => ({ key: tab.key, label: tab.label }))}
                activeTab={activeTab()}
                onTabChange={setActiveTab}
              >
                <div class="mt-4">
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    {currentTab().title}
                  </h3>
                  <p class="text-gray-500 mb-6">
                    {currentTab().description}
                  </p>

                  {/* Steps */}
                  <div class="space-y-4">
                    <For each={currentTab().steps}>
                      {(step) => (
                        <div class="flex gap-4 p-4 bg-gray-50 rounded-xl">
                          <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-medium text-sm">
                            {step.step}
                          </div>
                          <div>
                            <h4 class="font-medium text-gray-900 mb-1">{step.title}</h4>
                            <p class="text-gray-600 text-sm">{step.description}</p>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>

                  {/* Image Placeholder */}
                  <Show when={currentTab().image}>
                    <div class="mt-8">
                      <div class="bg-gray-100 rounded-xl aspect-video flex items-center justify-center">
                        <div class="text-center text-gray-400">
                          <svg class="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p class="text-sm">Tutorial image will appear here</p>
                          <p class="text-xs mt-1">{currentTab().image}</p>
                        </div>
                      </div>
                    </div>
                  </Show>
                </div>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar - Need Help */}
          <div class="lg:col-span-1">
            <Card class="sticky top-24">
              <div class="text-center">
                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 class="font-semibold text-gray-900 mb-2">{t().tutorial.needHelp}</h4>
                <p class="text-sm text-gray-500 mb-4">
                  {t().tutorial.needHelpDesc}
                </p>
                <Button href="/contact" variant="outline" class="w-full">
                  {t().tutorial.contactUs}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Tutorial;
