import { useEffect } from 'react';
import { Link, Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from './assets/Harmiana_logo.png';

const SUPPORTED = ['en', 'fr'] as const;

function useLang() {
  const { lang } = useParams();
  const safeLang = SUPPORTED.includes(lang as (typeof SUPPORTED)[number]) ? (lang as typeof SUPPORTED[number]) : 'en';
  return safeLang;
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

  return (
    <div className="min-h-screen">
      <header className="px-6 py-6 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-4 justify-between">
          <Link to={`/${lang}`} className="flex items-center gap-3 text-xl font-bold tracking-tight">
            <img src={logo} alt="Harmiana logo" className="h-10 w-10 rounded-full border border-slate-800" />
            <span>Harmiana</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link to={`/${lang}`} className="hover:text-white">{t('nav.home')}</Link>
            <Link to={`/${lang}/privacy`} className="hover:text-white">{t('nav.privacy')}</Link>
            <Link to={`/${lang}/terms`} className="hover:text-white">{t('nav.terms')}</Link>
            <Link to={`/${lang}/about`} className="hover:text-white">{t('nav.about')}</Link>
          </nav>
          <div className="flex items-center gap-2 text-xs">
            <Link to={switchLang('en')} className={lang === 'en' ? 'text-white' : 'text-slate-400'}>EN</Link>
            <span className="text-slate-600">/</span>
            <Link to={switchLang('fr')} className={lang === 'fr' ? 'text-white' : 'text-slate-400'}>FR</Link>
          </div>
        </div>
      </header>
      <main className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
      <footer className="px-6 py-10 border-t border-slate-800 text-sm text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-between">
          <span>{t('footer.copy')}</span>
          <span>{t('footer.contact')}</span>
        </div>
      </footer>
    </div>
  );
}

function Home() {
  const { t } = useTranslation();
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="text-slate-400 text-sm uppercase tracking-[0.3em]">{t('home.tagline')}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold">{t('home.title')}</h1>
        <p className="text-lg text-slate-300 max-w-2xl">{t('home.subtitle')}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-slate-800 p-5 bg-slate-900/30">
          <h3 className="font-semibold">{t('home.card1.title')}</h3>
          <p className="text-sm text-slate-400 mt-2">{t('home.card1.body')}</p>
        </div>
        <div className="rounded-xl border border-slate-800 p-5 bg-slate-900/30">
          <h3 className="font-semibold">{t('home.card2.title')}</h3>
          <p className="text-sm text-slate-400 mt-2">{t('home.card2.body')}</p>
        </div>
        <div className="rounded-xl border border-slate-800 p-5 bg-slate-900/30">
          <h3 className="font-semibold">{t('home.card3.title')}</h3>
          <p className="text-sm text-slate-400 mt-2">{t('home.card3.body')}</p>
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  const { t } = useTranslation();
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{t('privacy.title')}</h1>
      <p>{t('privacy.body1')}</p>
      <p>{t('privacy.body2')}</p>
    </article>
  );
}

function Terms() {
  const { t } = useTranslation();
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{t('terms.title')}</h1>
      <p>{t('terms.body1')}</p>
      <p>{t('terms.body2')}</p>
    </article>
  );
}

function About() {
  const { t } = useTranslation();
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{t('about.title')}</h1>
      <p>{t('about.body1')}</p>
      <p>{t('about.body2')}</p>
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
