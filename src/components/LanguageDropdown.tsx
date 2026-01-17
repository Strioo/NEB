import { Component, createSignal, Show, onMount, onCleanup, createEffect } from 'solid-js';
import { useI18n, Language } from '../i18n';

const LanguageDropdown: Component = () => {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = createSignal(false);
  let dropdownRef: HTMLDivElement | undefined;

  const languages = [
    { code: 'id' as Language, name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = () => languages.find(lang => lang.code === language());

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const toggleDropdown = (e: Event) => {
    e.stopPropagation();
    setIsOpen(!isOpen());
  };

  // Close dropdown when clicking outside
  onMount(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    onCleanup(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  });

  return (
    <div ref={dropdownRef} class="language-dropdown relative">
      <button
        type="button"
        onClick={toggleDropdown}
        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
        aria-label="Select language"
        aria-expanded={isOpen()}
      >
        <span class="hidden sm:inline uppercase">{language()}</span>
        <svg 
          class={`w-4 h-4 transition-transform duration-200 ${isOpen() ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <Show when={isOpen()}>
        <div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
          {languages.map((lang) => (
            <button
              type="button"
              onClick={() => handleSelect(lang.code)}
              class={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                language() === lang.code
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span class="text-xl">{lang.flag}</span>
              <span class="flex-1 text-left">{lang.name}</span>
              <Show when={language() === lang.code}>
                <svg class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </Show>
            </button>
          ))}
        </div>
      </Show>
    </div>
  );
};

export default LanguageDropdown;
