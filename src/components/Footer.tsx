import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import Container from './Container';
import { useI18n } from '../i18n';

const Footer: Component = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer class="bg-white border-t border-gray-100 py-12">
      <Container>
        <div class="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div class="md:col-span-1">
            <A href="/" class="text-xl font-bold text-gray-900 tracking-tight">
              NEB
            </A>
            <p class="mt-3 text-sm text-gray-500 leading-relaxed">
              {t().footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4">{t().footer.product}</h4>
            <ul class="space-y-3">
              <li>
                <A href="/services" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t().nav.services}
                </A>
              </li>
              <li>
                <A href="/tutorial" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t().nav.tutorial}
                </A>
              </li>
              <li>
                <A href="/#faq" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  FAQ
                </A>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4">{t().footer.company}</h4>
            <ul class="space-y-3">
              <li>
                <A href="/contact" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t().nav.contact}
                </A>
              </li>
              <li>
                <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t().footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t().footer.terms}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4">{t().footer.connect}</h4>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:support@neb.com" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div class="mt-12 pt-8 border-t border-gray-100">
          <p class="text-sm text-gray-400 text-center">
            © {currentYear} NEB. {t().footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
