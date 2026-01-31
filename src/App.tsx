import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from './assets/Harmiana_logo.png';
import crystalGrid1 from './assets/crystal-grid-1.png';
import crystalGrid2 from './assets/crystal-grid-2.png';

const SUPPORTED = ['en', 'fr'] as const;

function useLang() {
  const { lang } = useParams();
  const safeLang = SUPPORTED.includes(lang as (typeof SUPPORTED)[number]) ? (lang as typeof SUPPORTED[number]) : 'en';
  return safeLang;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function LangLayout() {
  const { i18n, t } = useTranslation();
  const lang = useLang();
  const location = useLocation();

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [i18n, lang]);

  const switchLang = (next: string) => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${next}`;
    segments[0] = next;
    return `/${segments.join('/')}`;
  };

  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = (['home', 'privacy', 'terms', 'about'] as const).map((key) => ({
    key,
    path: key === 'home' ? `/${lang}` : `/${lang}/${key}`,
    label: t(`nav.${key}`),
  }));

  return (
    <div className="min-h-screen font-body">
      <header className="px-6 py-5 border-b border-navy-800/60">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to={`/${lang}`} className="flex items-center gap-3 group">
            <img src={logo} alt="Harmiana logo" className="h-10 w-10 rounded-full" />
            <span className="font-display text-xl font-semibold tracking-tight text-white">Harmiana</span>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex items-center gap-5 text-sm text-slate-400">
              {navLinks.map(({ key, path, label }) => (
                <Link
                  key={key}
                  to={path}
                  className="relative py-1 transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent-blue after:transition-all hover:after:w-full"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-1 text-xs">
              {SUPPORTED.map((code) => (
                <Link
                  key={code}
                  to={switchLang(code)}
                  className={`px-2.5 py-1 rounded-full transition-colors ${
                    lang === code ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {code.toUpperCase()}
                </Link>
              ))}
            </div>
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden text-slate-400 hover:text-white p-1"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen ? (
                  <path d="M5 5l10 10M15 5L5 15" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile nav dropdown */}
        {menuOpen && (
          <nav className="sm:hidden mt-4 pb-2 flex flex-col gap-3 text-sm text-slate-400 border-t border-navy-800/40 pt-4">
            {navLinks.map(({ key, path, label }) => (
              <Link key={key} to={path} className="hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="px-6 py-16 border-t border-navy-800/60">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-8 w-8 rounded-full" />
              <span className="font-display font-semibold text-white">Harmiana</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">{t('footer.tagline')}</p>
            <p className="text-xs text-slate-600">{t('footer.copy')}</p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <nav className="flex flex-col gap-2 text-slate-400">
              <Link to={`/${lang}`} className="hover:text-white transition-colors">{t('nav.home')}</Link>
              <Link to={`/${lang}/privacy`} className="hover:text-white transition-colors">{t('nav.privacy')}</Link>
              <Link to={`/${lang}/terms`} className="hover:text-white transition-colors">{t('nav.terms')}</Link>
              <Link to={`/${lang}/about`} className="hover:text-white transition-colors">{t('nav.about')}</Link>
            </nav>
            <a href={`mailto:${t('footer.contact')}`} className="text-slate-500 hover:text-accent-blue transition-colors mt-2">
              {t('footer.contact')}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Home() {
  const { t } = useTranslation();
  const showcaseRef = useReveal();
  const valuesRef = useReveal();

  const values = t('home.values', { returnObjects: true }) as string[];

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 pt-28 pb-16 overflow-hidden grain">
        {/* Background glow */}
        <div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(74,158,222,0.08) 0%, rgba(162,155,254,0.04) 40%, transparent 70%)',
          }}
        />
        <div className="max-w-5xl mx-auto relative">
          <p className="slide-up text-accent-blue text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            {t('home.tagline')}
          </p>
          <h1 className="slide-up delay-100 font-display text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
            {t('home.title')}
          </h1>
          <p className="slide-up delay-200 text-lg text-slate-300 max-w-2xl mt-6 leading-relaxed">
            {t('home.subtitle')}
          </p>
          <div className="slide-up delay-300 mt-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-amber/15 text-accent-amber text-sm font-medium border border-accent-amber/25">
              {t('home.badge')}
            </span>
          </div>
        </div>
      </section>

      {/* Game Showcase */}
      <section ref={showcaseRef} className="reveal px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            {t('home.game.name')}
          </h2>

          {/* Screenshot composition */}
          <div className="flex justify-center items-center mb-12">
            <div className="relative flex items-end gap-4 md:gap-0">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-accent-pink/10 max-w-[260px] md:max-w-[300px]">
                <img
                  src={crystalGrid1}
                  alt="Crystal Grid gameplay screenshot"
                  className="w-full h-auto"
                />
              </div>
              <div className="relative md:-ml-8 rounded-2xl overflow-hidden shadow-2xl shadow-accent-purple/15 max-w-[260px] md:max-w-[300px] md:rotate-3 md:translate-y-4">
                <img
                  src={crystalGrid2}
                  alt="Crystal Grid gameplay screenshot"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <div className="text-center max-w-xl mx-auto">
            <p className="text-slate-300 text-lg leading-relaxed">
              {t('home.game.description')}
            </p>
            <div className="mt-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-amber/15 text-accent-amber text-sm font-medium border border-accent-amber/25">
                {t('home.badge')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Philosophy */}
      <section ref={valuesRef} className="reveal px-6 py-16">
        <div className="max-w-2xl mx-auto space-y-5">
          {values.map((line, i) => (
            <div key={i} className="flex items-start gap-4">
              <span
                className="mt-2 h-2 w-2 rounded-full shrink-0"
                style={{
                  backgroundColor: ['#4a9ede', '#00b894', '#a29bfe'][i % 3],
                }}
              />
              <p className="text-slate-300 leading-relaxed">{line}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Privacy() {
  const { t } = useTranslation();
  return (
    <article className="px-6 py-16">
      <div className="max-w-3xl mx-auto font-body leading-relaxed">
        <h1 className="legal-heading font-display text-3xl font-bold mb-8">{t('privacy.title')}</h1>
        <div className="space-y-4 text-slate-300">
          <p>{t('privacy.body1')}</p>
          <p>{t('privacy.body2')}</p>
        </div>
      </div>
    </article>
  );
}

function Terms() {
  const { t } = useTranslation();
  return (
    <article className="px-6 py-16">
      <div className="max-w-3xl mx-auto font-body leading-relaxed">
        <h1 className="legal-heading font-display text-3xl font-bold mb-8">{t('terms.title')}</h1>
        <div className="space-y-4 text-slate-300">
          <p>{t('terms.body1')}</p>
          <p>{t('terms.body2')}</p>
        </div>
      </div>
    </article>
  );
}

function About() {
  const { t } = useTranslation();
  const beliefs = t('about.beliefs', { returnObjects: true }) as string[];

  return (
    <article className="px-6 py-16">
      <div className="max-w-3xl mx-auto font-body leading-relaxed">
        <h1 className="legal-heading font-display text-3xl font-bold mb-8">{t('about.title')}</h1>
        <p className="text-slate-300 mb-12">{t('about.story')}</p>

        <h2 className="font-display text-xl font-semibold mb-6">{t('about.beliefsTitle')}</h2>
        <div className="space-y-4">
          {beliefs.map((line, i) => (
            <div key={i} className="flex items-start gap-4">
              <span
                className="mt-2 h-2 w-2 rounded-full shrink-0"
                style={{
                  backgroundColor: ['#4a9ede', '#00b894', '#a29bfe'][i % 3],
                }}
              />
              <p className="text-slate-300">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang" element={<LangLayout />}>
        <Route index element={<Home />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}
