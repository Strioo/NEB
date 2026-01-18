import { Component, createSignal, onMount, For, Show } from 'solid-js';
import { Container, Badge, Button } from '../components';
import { useI18n } from '../i18n';

interface ServiceData {
  enabled: boolean;
  name: string;
  slug: string;
  description: {
    seamless?: string;
    supported?: string;
    instant?: string;
    default?: string;
  };
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: ServiceData[];
}

const Services: Component = () => {
  const { t } = useI18n();
  const [services, setServices] = createSignal<ServiceData[]>([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Fetch services from API
  onMount(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/service`);
      const result: ApiResponse = await response.json();
      
      if (result.code === 200 && result.data) {
        setServices(result.data);
      } else {
        setError(result.message || 'Failed to fetch services');
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  });

  const getServiceIcon = (slug: string) => {
    const icons: Record<string, any> = {
      'safe-exam-bypasser': (
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      'kahoot-bypasser': (
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'quizizz-bypasser': (
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    };
    return icons[slug] || icons['safe-exam-bypasser'];
  };

  const getServiceColor = (slug: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      'safe-exam-bypasser': { bg: 'bg-primary-50', text: 'text-primary-600', border: 'border-primary-200' },
      'kahoot-bypasser': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      'quizizz-bypasser': { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    };
    return colors[slug] || colors['safe-exam-bypasser'];
  };

  const sebFeatures = () => [
    {
      icon: (
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t().services.feature1Title,
      description: t().services.feature1Desc,
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t().services.feature2Title,
      description: t().services.feature2Desc,
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t().services.feature3Title,
      description: t().services.feature3Desc,
    },
  ];

  const howItWorks = () => [
    {
      step: '01',
      title: t().services.step1Title,
      description: t().services.step1Desc,
    },
    {
      step: '02',
      title: t().services.step2Title,
      description: t().services.step2Desc,
    },
    {
      step: '03',
      title: t().services.step3Title,
      description: t().services.step3Desc,
    },
  ];

  return (
    <div>
      {/* Hero Section - All Services Overview */}
      <section class="py-20 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <Container>
          <div class="max-w-4xl mx-auto text-center mb-16">
            <Badge text={t().services.badge} variant="accent" class="mb-4" />
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t().services.title}
            </h1>
            <p class="text-xl text-gray-500">
              {t().services.subtitle}
            </p>
          </div>

          {/* Services Grid - 3 Cards Equal Showcase */}
          <div class="max-w-5xl mx-auto">
            <Show when={isLoading()}>
              <div class="flex items-center justify-center py-12">
                <svg class="animate-spin w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            </Show>

            <Show when={error()}>
              <div class="p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                <p class="text-red-700">{error()}</p>
              </div>
            </Show>

            <Show when={!isLoading() && !error()}>
              <div class="grid md:grid-cols-3 gap-6">
                <For each={services()}>
                  {(service) => {
                    const colors = getServiceColor(service.slug);
                    return (
                      <div class={`feature-card card-base overflow-hidden border-2 ${colors.border} ${service.enabled ? 'shadow-lg hover:shadow-xl' : 'opacity-75'} transition-all`}>
                        {/* Service Header */}
                        <div class={`${colors.bg} px-6 py-8 text-center`}>
                          <div class={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 ${colors.text}`}>
                            {getServiceIcon(service.slug)}
                          </div>
                          <h3 class="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                          <Show when={service.enabled} fallback={
                            <Badge text="Coming Soon" variant="subtle" />
                          }>
                            <Badge text="Available" variant="accent" />
                          </Show>
                        </div>

                        {/* Service Body */}
                        <div class="p-6">
                          {/* Dynamic description rendering - shows all available descriptions */}
                          <div class="space-y-3 mb-6">
                            {/* Default description */}
                            <Show when={service.description?.default}>
                              <p class="text-sm text-gray-700 leading-relaxed font-medium">
                                {service.description.default}
                              </p>
                            </Show>

                            {/* Additional descriptions with checkmarks */}
                            <Show when={service.description?.seamless || service.description?.supported || service.description?.instant}>
                              <div class="space-y-2 pt-3 border-t border-gray-100">
                                <Show when={service.description?.seamless}>
                                  <div class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p class="text-xs text-gray-600 leading-relaxed">{service.description.seamless}</p>
                                  </div>
                                </Show>
                                <Show when={service.description?.supported}>
                                  <div class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p class="text-xs text-gray-600 leading-relaxed">{service.description.supported}</p>
                                  </div>
                                </Show>
                                <Show when={service.description?.instant}>
                                  <div class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p class="text-xs text-gray-600 leading-relaxed">{service.description.instant}</p>
                                  </div>
                                </Show>
                              </div>
                            </Show>
                          </div>

                          <Show when={service.enabled} fallback={
                            <button disabled class="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
                              Not Available Yet
                            </button>
                          }>
                            <Button href="/upload" variant="accent" class="w-full justify-center">
                              Get Started
                              <svg class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Button>
                          </Show>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
            </Show>
          </div>
        </Container>
      </section>

      {/* Safe Exam Bypasser - Featured Service Section */}
      <section class="py-20 bg-white">
        <Container>
          <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12">
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
                <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">Featured Service</span>
              </div>
              <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Safe Exam Browser Bypass
              </h2>
              <p class="text-lg text-gray-500 max-w-2xl mx-auto">
                {t().services.sebDescription}
              </p>
            </div>

            {/* Features Grid - Focus on Benefits */}
            <div class="grid md:grid-cols-3 gap-6 mb-8">
              <For each={sebFeatures()}>
                {(feature) => (
                  <div class="feature-card card-base p-6 text-center hover:shadow-lg transition-shadow">
                    <div class="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                )}
              </For>
            </div>

            {/* CTA Section */}
            <div class="text-center mt-12">
              <Button href="/upload" variant="accent" class="!px-10 !py-5 !text-lg">
                {t().services.ctaUpload}
                <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </Button>
              <p class="text-sm text-gray-500 mt-4">
                Upload file config dan dapatkan akses bypass instan
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section class="py-20 bg-gray-50">
        <Container>
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              {t().services.howItWorksTitle}
            </h2>
            <p class="text-lg text-gray-500 max-w-2xl mx-auto">
              {t().services.howItWorksSubtitle}
            </p>
          </div>
          
          <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-3 gap-8">
              <For each={howItWorks()}>
                {(item, index) => (
                  <div class="relative">
                    {/* Connector Line */}
                    <Show when={index() < 2}>
                      <div class="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent z-0" />
                    </Show>
                    
                    <div class="feature-card card-base p-6 text-center relative z-10">
                      <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-primary-600">{item.step}</span>
                      </div>
                      <h3 class="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p class="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section class="py-20">
        <Container>
          <div class="max-w-3xl mx-auto">
            <div class="bg-gradient-to-r from-primary-600 to-primary-500 rounded-3xl p-8 md:p-12 text-center">
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                {t().services.ctaTitle}
              </h2>
              <p class="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                {t().services.ctaSubtitle}
              </p>
              <div class="flex flex-wrap gap-4 justify-center">
                <Button href="/upload" class="!bg-white !text-primary-600 hover:!bg-gray-100">
                  {t().services.ctaUpload}
                  <svg class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </Button>
                <Button href="/tutorial" variant="outline" class="!border-white/30 !text-white hover:!bg-white/10">
                  {t().services.helpCta}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Services;
