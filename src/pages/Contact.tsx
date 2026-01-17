import { Component, createSignal, Show } from 'solid-js';
import { Container, SectionHeader, Card, Button } from '../components';
import { useI18n } from '../i18n';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: Component = () => {
  const { t } = useI18n();
  
  const [formData, setFormData] = createSignal<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = createSignal<FormErrors>({});
  const [submitted, setSubmitted] = createSignal(false);
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = (): boolean => {
    const data = formData();
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = t().contact.nameError;
    }

    if (!data.email.trim()) {
      newErrors.email = t().contact.emailError;
    } else if (!validateEmail(data.email)) {
      newErrors.email = t().contact.emailInvalid;
    }

    if (!data.message.trim()) {
      newErrors.message = t().contact.messageError;
    } else if (data.message.trim().length < 10) {
      newErrors.message = t().contact.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors()[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div class="section-padding">
      <Container>
        <SectionHeader
          title={t().contact.title}
          subtitle={t().contact.subtitle}
        />

        <div class="grid lg:grid-cols-1 gap-12 max-w-2xl mx-auto">
          {/* Contact Form */}
          <div>
            <Card>
              <h3 class="text-xl font-semibold text-gray-900 mb-6">{t().contact.formTitle}</h3>

              {/* Success Toast */}
              <Show when={submitted()}>
                <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3">
                  <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t().contact.successMessage}</span>
                </div>
              </Show>

              <form onSubmit={handleSubmit} noValidate>
                {/* Name Field */}
                <div class="mb-4">
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                    {t().contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData().name}
                    onInput={(e) => updateField('name', e.currentTarget.value)}
                    class={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors
                      ${errors().name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                    placeholder={t().contact.namePlaceholder}
                  />
                  <Show when={errors().name}>
                    <p class="mt-1 text-sm text-red-600">{errors().name}</p>
                  </Show>
                </div>

                {/* Email Field */}
                <div class="mb-4">
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                    {t().contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData().email}
                    onInput={(e) => updateField('email', e.currentTarget.value)}
                    class={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors
                      ${errors().email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                    placeholder={t().contact.emailPlaceholder}
                  />
                  <Show when={errors().email}>
                    <p class="mt-1 text-sm text-red-600">{errors().email}</p>
                  </Show>
                </div>

                {/* Message Field */}
                <div class="mb-6">
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                    {t().contact.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData().message}
                    onInput={(e) => updateField('message', e.currentTarget.value)}
                    class={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none
                      ${errors().message ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                    placeholder={t().contact.messagePlaceholder}
                  />
                  <Show when={errors().message}>
                    <p class="mt-1 text-sm text-red-600">{errors().message}</p>
                  </Show>
                </div>

                <Button type="submit" class="w-full" disabled={isSubmitting()}>
                  {isSubmitting() ? t().contact.submitting : t().contact.submitBtn}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
