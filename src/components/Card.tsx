import { Component, JSX } from 'solid-js';

interface CardProps {
  children: JSX.Element;
  class?: string;
  header?: JSX.Element;
  headerGradient?: boolean;
}

const Card: Component<CardProps> = (props) => {
  return (
    <div class={`card-base overflow-hidden ${props.class || ''}`}>
      {props.header && (
        <div class={`px-6 py-4 ${props.headerGradient ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white' : 'bg-gray-50 border-b border-gray-100'}`}>
          {props.header}
        </div>
      )}
      <div class="p-6">
        {props.children}
      </div>
    </div>
  );
};

export default Card;
