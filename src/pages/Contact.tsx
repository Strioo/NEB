import { Component, createSignal, Show } from 'solid-js';
import { Container, Button } from '../components';
import { useI18n } from '../i18n';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  image: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  image?: string;
  server?: string;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  errors?: FormErrors;
}

const Contact: Component = () => {
  const { t } = useI18n();
  
  const [formData, setFormData] = createSignal<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    image: null,
  });
  const [errors, setErrors] = createSignal<FormErrors>({});
  const [submitted, setSubmitted] = createSignal(false);
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [successMessage, setSuccessMessage] = createSignal('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

    // Validate image if provided
    if (data.image) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
      
      if (data.image.size > maxSize) {
        newErrors.image = 'File size must not exceed 5MB';
      } else if (!allowedTypes.includes(data.image.type)) {
        newErrors.image = 'Only PNG, JPG, JPEG, and PDF files are allowed';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const data = formData();
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', data.name);
      formDataToSend.append('email', data.email);
      formDataToSend.append('subject', data.subject);
      formDataToSend.append('message', data.message);
      
      if (data.image) {
        formDataToSend.append('image', data.image);
      }

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result: ApiResponse = await response.json();

      if (response.ok && result.code === 200) {
        setSuccessMessage(result.message);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '', image: null });

        // Reset file input
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
          setSuccessMessage('');
        }, 5000);
      } else {
        // Handle validation errors from backend
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ server: result.message });
        }
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setErrors({ server: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors()[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files?.[0] || null;
    updateField('image', file);
  };

  return (
    <div>
      {/* Hero Section */}
      <section class="py-20 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <Container>
          <div class="max-w-4xl mx-auto text-center mb-12">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-6">
              <svg class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                Contact Us
              </span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t().contact.title}
            </h1>
            <p class="text-xl text-gray-500 max-w-2xl mx-auto">
              {t().contact.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section class="py-20 bg-white">
        <Container>
          <div class="max-w-2xl mx-auto">
            {/* Success Message */}
            <Show when={submitted()}>
              <div class="mb-8 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg animate-slideDown">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-white mb-1">Success! 🎉</h3>
                    <p class="text-white/90 text-sm">{successMessage()}</p>
                  </div>
                </div>
              </div>
            </Show>

            {/* Server Error Message */}
            <Show when={errors().server}>
              <div class="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
                <div class="flex items-start gap-4">
                  <svg class="w-6 h-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div class="flex-1">
                    <h3 class="text-base font-semibold text-red-900 mb-1">Error</h3>
                    <p class="text-red-700 text-sm">{errors().server}</p>
                  </div>
                </div>
              </div>
            </Show>

            {/* Contact Form Card */}
            <div class="feature-card card-base overflow-hidden shadow-xl">
              {/* Card Header */}
              <div class="bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-white">{t().contact.formTitle}</h2>
                    <p class="text-white/80 text-sm">We'll get back to you as soon as possible</p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div class="p-8">
                <form onSubmit={handleSubmit} noValidate class="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                      {t().contact.nameLabel}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData().name}
                      onInput={(e) => updateField('name', e.currentTarget.value)}
                      class={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all
                        ${errors().name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                      placeholder={t().contact.namePlaceholder}
                      disabled={isSubmitting()}
                    />
                    <Show when={errors().name}>
                      <div class="mt-2 flex items-center gap-1 text-red-600">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm">{errors().name}</span>
                      </div>
                    </Show>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                      {t().contact.emailLabel}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData().email}
                      onInput={(e) => updateField('email', e.currentTarget.value)}
                      class={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all
                        ${errors().email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                      placeholder={t().contact.emailPlaceholder}
                      disabled={isSubmitting()}
                    />
                    <Show when={errors().email}>
                      <div class="mt-2 flex items-center gap-1 text-red-600">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm">{errors().email}</span>
                      </div>
                    </Show>
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={formData().subject}
                      onChange={(e) => updateField('subject', e.currentTarget.value)}
                      class={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none bg-white
                        ${errors().subject ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                      disabled={isSubmitting()}
                    >
                      <option value="">Select your inquiry</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Payment Issue">Payment Issue</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Other">Other</option>
                    </select>
                    <Show when={errors().subject}>
                      <div class="mt-2 flex items-center gap-1 text-red-600">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm">{errors().subject}</span>
                      </div>
                    </Show>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
                      {t().contact.messageLabel}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData().message}
                      onInput={(e) => updateField('message', e.currentTarget.value)}
                      class={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none
                        ${errors().message ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                      placeholder={t().contact.messagePlaceholder}
                      disabled={isSubmitting()}
                    />
                    <Show when={errors().message}>
                      <div class="mt-2 flex items-center gap-1 text-red-600">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm">{errors().message}</span>
                      </div>
                    </Show>
                    <p class="mt-2 text-xs text-gray-500">Minimum 10 characters required</p>
                  </div>

                  {/* Image Upload Field */}
                  <div>
                    <label for="image" class="block text-sm font-semibold text-gray-700 mb-2">
                      Image
                    </label>
                    <div class="relative">
                      <input
                        type="file"
                        id="image"
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={handleFileChange}
                        class="hidden"
                        disabled={isSubmitting()}
                      />
                      <label
                        for="image"
                        class={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-all
                          ${errors().image ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-primary-500 bg-gray-50 hover:bg-primary-50'}`}
                      >
                        <div class="text-center">
                          <svg class="mx-auto w-10 h-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <Show when={formData().image} fallback={
                            <>
                              <p class="text-sm font-medium text-gray-700">Choose File</p>
                              <p class="text-xs text-gray-500 mt-1">PNG, JPG, JPEG, or PDF (max 5MB)</p>
                            </>
                          }>
                            <p class="text-sm font-medium text-primary-600">{formData().image?.name}</p>
                            <p class="text-xs text-gray-500 mt-1">{((formData().image?.size || 0) / 1024).toFixed(2)} KB</p>
                          </Show>
                        </div>
                      </label>
                    </div>
                    <Show when={errors().image}>
                      <div class="mt-2 flex items-center gap-1 text-red-600">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm">{errors().image}</span>
                      </div>
                    </Show>
                    <p class="mt-2 text-xs text-gray-500">Upload screenshot or PDF of your issue (Max 5MB)</p>
                  </div>

                  {/* Submit Button */}
                  <div class="pt-4">
                    <Button 
                      type="submit" 
                      variant="accent" 
                      class="w-full !py-4 !text-base !font-semibold"
                      disabled={isSubmitting()}
                    >
                      <Show when={isSubmitting()} fallback={
                        <>
                          {t().contact.submitBtn}
                          <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      }>
                        <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span class="ml-2">{t().contact.submitting}</span>
                      </Show>
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Info Cards */}
            <div class="grid md:grid-cols-2 gap-6 mt-12">
              <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
                <p class="text-gray-600 text-sm">We typically respond within 24 hours on business days</p>
              </div>

              <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Your Privacy</h3>
                <p class="text-gray-600 text-sm">Your information is secure and will never be shared</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
