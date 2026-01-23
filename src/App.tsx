import { Router, Route, useIsRouting } from '@solidjs/router';
import { Component, JSX, lazy, Suspense } from 'solid-js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingBar from './components/LoadingBar';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Tutorial = lazy(() => import('./pages/Tutorial'));
const Contact = lazy(() => import('./pages/Contact'));
const Upload = lazy(() => import('./pages/Upload'));

// Fallback loading component
const PageLoader: Component = () => (
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <svg class="animate-spin w-12 h-12 text-primary-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <p class="text-gray-500 text-sm">Loading...</p>
    </div>
  </div>
);

// Layout wrapper that includes Navbar, Footer, and Loading Bar
const Layout: Component<{ children?: JSX.Element }> = (props) => {
  const isRouting = useIsRouting();
  
  return (
    <div class="min-h-screen flex flex-col">
      <LoadingBar isLoading={isRouting()} />
      <Navbar />
      <main class="flex-1">
        <Suspense fallback={<PageLoader />}>
          {props.children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const App: Component = () => {
  return (
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/tutorial" component={Tutorial} />
      <Route path="/contact" component={Contact} />
      <Route path="/upload" component={Upload} />
    </Router>
  );
};

export default App;
