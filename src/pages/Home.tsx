import { Component, createSignal, onMount, For, Show } from 'solid-js';
import { Container, Button, Accordion } from '../components';
import { useI18n } from '../i18n';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqApiResponse {
  code: number;
  status: string;
  message: string;
  data: FaqItem[];
}

const Home: Component = () => {
  const { t } = useI18n();
  const [faqs, setFaqs] = createSignal<FaqItem[]>([]);
  const [isLoadingFaq, setIsLoadingFaq] = createSignal(true);
  const [faqError, setFaqError] = createSignal('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Fetch FAQ from API
  onMount(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/faq`);
      const result: FaqApiResponse = await response.json();
      
      if (result.code === 200 && result.data) {
        setFaqs(result.data);
      } else {
        setFaqError(result.message || 'Failed to fetch FAQs');
      }
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setFaqError('Failed to load FAQs');
    } finally {
      setIsLoadingFaq(false);
    }
  });

  // Transform API data to Accordion format
  const getFaqData = () => {
    return faqs().map((faq, index) => ({
      id: `faq-${index}`,
      question: faq.q,
      answer: faq.a,
    }));
  };

  return (
    <div>
      {/* Hero Section */}
      <section class="relative section-padding overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
        {/* Simple Gradient Background */}
        <div class="absolute inset-0">
          {/* Subtle gradient orbs */}
          <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>

        <Container>
          <div class="relative z-10 text-center max-w-3xl mx-auto">
            {/* Simple Badge */}
            <div class="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span class="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                {t().hero.badge}
              </span>
              <span class="text-sm text-gray-600">{t().hero.badgeText}</span>
            </div>

            {/* Main Headline */}
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {t().hero.title1}
              <br />
              <span class="text-primary-600">
                {t().hero.title2}
              </span>
            </h1>

            {/* Subtitle */}
            <p class="text-xl text-gray-600 mb-10 leading-relaxed">
              {t().hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div class="flex flex-wrap gap-4 justify-center mb-12">
              <Button href="/services" class="!bg-primary-600 hover:!bg-primary-700 !shadow-lg hover:!shadow-xl !transition-all">
                {t().hero.ctaPrimary}
                <svg class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button href="/tutorial" variant="outline" class="!bg-white !border-gray-300 !text-gray-700 hover:!bg-gray-50 !shadow-sm hover:!shadow !transition-all">
                {t().hero.ctaSecondary}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div class="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium text-gray-700">Instan & Aman</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span class="font-medium text-gray-700">24/7 Support</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
                <span class="font-medium text-gray-700">Mudah Digunakan</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Service Highlight - Safe Exam Bypasser */}
      <section class="section-padding bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-6">
                <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                  {t().mainService.label}
                </span>
              </div>
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t().mainService.title}
              </h2>
              <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                {t().mainService.description}
              </p>

              {/* Simple Gimmick - Just Upload */}
              <div class="space-y-4 mb-8">
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Upload File Config</h4>
                    <p class="text-gray-500 text-sm">Upload file .seb config Anda ke sistem</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Langsung Jadi!</h4>
                    <p class="text-gray-500 text-sm">Sistem otomatis memproses dan memberikan akses bypass</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Kerjakan Ujian Bebas</h4>
                    <p class="text-gray-500 text-sm">Copy-paste, screenshot, akses tab lain tanpa batasan</p>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap gap-4">
                <Button href="/upload" variant="accent" class="!shadow-lg hover:!shadow-xl">
                  {t().mainService.cta}
                  <svg class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </Button>
                <Button href="/services" variant="outline">
                  {t().mainService.learnMore}
                  <svg class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Right: Visual Demo Card */}
            <div class="relative">
              {/* Main Card */}
              <div class="feature-card card-base overflow-hidden shadow-xl">
                {/* Card Header */}
                <div class="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-white text-sm">Safe Exam Browser</h4>
                      <p class="text-white/80 text-xs">{t().mainService.demoStatus}</p>
                    </div>
                    <div class="px-2.5 py-1 bg-white/20 rounded-full">
                      <span class="text-xs font-semibold text-white">BYPASS</span>
                    </div>
                  </div>
                </div>

                {/* Card Body - Simple Gimmick Visual */}
                <div class="p-6 bg-white">
                  <div class="space-y-4">
                    {/* Upload Step */}
                    <div class="text-center py-8">
                      <div class="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg class="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <h3 class="text-lg font-bold text-gray-900 mb-2">Upload Config File</h3>
                      <p class="text-sm text-gray-500 mb-4">Drop file .seb Anda di sini</p>
                      
                      <div class="inline-block px-4 py-2 bg-gray-100 rounded-lg text-xs text-gray-600 font-mono">
                        exam-config.seb
                      </div>
                    </div>

                    {/* Processing Animation */}
                    <div class="flex justify-center">
                      <div class="flex gap-1">
                        <div class="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                        <div class="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                        <div class="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                      </div>
                    </div>

                    {/* Result */}
                    <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                      <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <p class="text-base font-bold text-white">Siap Digunakan! 🎉</p>
                        <p class="text-sm text-white/90">Akses bypass sudah aktif</p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div class="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                      <div class="text-center">
                        <p class="text-xs text-gray-500">Waktu</p>
                        <p class="text-sm font-bold text-gray-900">2 detik</p>
                      </div>
                      <div class="text-center">
                        <p class="text-xs text-gray-500">Status</p>
                        <p class="text-sm font-bold text-green-600">Aktif</p>
                      </div>
                      <div class="text-center">
                        <p class="text-xs text-gray-500">Akses</p>
                        <p class="text-sm font-bold text-gray-900">Penuh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div class="absolute -z-10 -top-6 -right-6 w-48 h-48 bg-primary-100 rounded-3xl opacity-50 blur-3xl"></div>
              <div class="absolute -z-10 -bottom-6 -left-6 w-48 h-48 bg-orange-100 rounded-3xl opacity-50 blur-3xl"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Row */}
      <section class="py-12 border-y border-gray-100">
        <Container>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900 mb-1">{t().benefits.instant}</div>
              <div class="text-sm text-gray-500">{t().benefits.instantDesc}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900 mb-1">{t().benefits.seamless}</div>
              <div class="text-sm text-gray-500">{t().benefits.seamlessDesc}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900 mb-1">{t().benefits.secure}</div>
              <div class="text-sm text-gray-500">{t().benefits.secureDesc}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900 mb-1">{t().benefits.available}</div>
              <div class="text-sm text-gray-500">{t().benefits.availableDesc}</div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section class="section-padding" id="faq">
        <Container>
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">
                {t().faq.title}
              </h2>
              <p class="text-xl text-gray-500">
                {t().faq.subtitle}
              </p>
            </div>
            
            {/* Loading State */}
            <Show when={isLoadingFaq()}>
              <div class="flex items-center justify-center py-12">
                <svg class="animate-spin w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            </Show>

            {/* Error State */}
            <Show when={faqError()}>
              <div class="p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                <p class="text-red-700">{faqError()}</p>
              </div>
            </Show>

            {/* FAQ Content */}
            <Show when={!isLoadingFaq() && !faqError() && faqs().length > 0}>
              <Accordion items={getFaqData()} defaultOpen="faq-0" />
            </Show>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section class="section-padding bg-gray-900">
        <Container>
          <div class="text-center">
            <h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t().cta.title}
            </h2>
            <p class="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              {t().cta.subtitle}
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <Button href="/services" class="!bg-primary-500 hover:!bg-primary-600">
                {t().cta.primaryBtn}
                <svg class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button href="/contact" variant="outline" class="!border-gray-700 !text-white hover:!bg-gray-800">
                {t().cta.secondaryBtn}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
