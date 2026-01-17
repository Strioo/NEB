import { Component } from 'solid-js';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader: Component<SectionHeaderProps> = (props) => {
  return (
    <div class={`mb-12 ${props.centered !== false ? 'text-center' : ''}`}>
      <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
        <span class="underline-accent pb-2">{props.title}</span>
      </h2>
      {props.subtitle && (
        <p class="text-gray-500 text-lg max-w-2xl mx-auto mt-6">
          {props.subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
