import { Router, Route } from '@solidjs/router';
import { Component, JSX } from 'solid-js';
import { I18nProvider } from './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Tutorial from './pages/Tutorial';
import Contact from './pages/Contact';
import Upload from './pages/Upload';

// Layout wrapper that includes Navbar and Footer
const Layout: Component<{ children?: JSX.Element }> = (props) => {
  return (
    <div class="min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-1">
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

const App: Component = () => {
  return (
    <I18nProvider>
      <Router root={Layout}>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/tutorial" component={Tutorial} />
        <Route path="/contact" component={Contact} />
        <Route path="/upload" component={Upload} />
      </Router>
    </I18nProvider>
  );
};

export default App;
