import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* Subtiele cookiebalk onderin (brandbook: Chic & minimal).
   Keuze staat in localStorage 'cookie_consent' = 'all' | 'necessary'.
   Google Analytics staat standaard op 'denied' (Consent Mode v2, zie index.html). */

type Choice = 'all' | 'necessary';
const KEY = 'cookie_consent';

const readChoice = (): Choice | null => {
  try { const v = localStorage.getItem(KEY); return v === 'all' || v === 'necessary' ? v : null; } catch { return null; }
};

const applyChoice = (c: Choice) => {
  try { localStorage.setItem(KEY, c); } catch { /* ignore */ }
  window.gtag?.('consent', 'update', { analytics_storage: c === 'all' ? 'granted' : 'denied' });
};

const CookieBanner: React.FC = () => {
  const [open, setOpen] = useState(() => readChoice() === null);
  const [settings, setSettings] = useState(false);
  const [stats, setStats] = useState(() => readChoice() !== 'necessary');

  useEffect(() => {
    const reopen = () => { setStats(readChoice() !== 'necessary'); setSettings(true); setOpen(true); };
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  const choose = (c: Choice) => { applyChoice(c); setOpen(false); setSettings(false); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-safe"
          role="dialog"
          aria-label="Cookie settings"
        >
          <div className="mx-auto max-w-xl mb-2 bg-paper rounded-card shadow-card ring-1 ring-inset ring-sand p-4">
            <p className="text-[15px] leading-snug">
              We use cookies to improve the game 🍪{' '}
              {!settings && (
                <button onClick={() => setSettings(true)} className="text-muted underline underline-offset-4 text-[13px]">
                  Settings
                </button>
              )}
            </p>

            {settings && (
              <div className="mt-3 space-y-2 text-[14px]">
                <div className="flex items-center justify-between gap-3">
                  <span><b className="font-semibold">Necessary</b> <span className="text-muted">· always on</span></span>
                  <span className="text-muted text-[13px]">On</span>
                </div>
                <label className="flex items-center justify-between gap-3 cursor-pointer">
                  <span><b className="font-semibold">Statistics</b> <span className="text-muted">· anonymous, Google Analytics</span></span>
                  <input
                    type="checkbox"
                    checked={stats}
                    onChange={e => setStats(e.target.checked)}
                    className="h-5 w-9 appearance-none rounded-full bg-sand checked:bg-rouge relative transition
                               before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:h-4 before:w-4 before:rounded-full before:bg-paper before:transition
                               checked:before:translate-x-4"
                  />
                </label>
              </div>
            )}

            <div className="mt-3 grid grid-cols-2 gap-2">
              {settings ? (
                <>
                  <button onClick={() => choose('necessary')} className="h-11 rounded-btn ring-1 ring-inset ring-sand font-semibold text-[15px]">Only necessary</button>
                  <button onClick={() => choose(stats ? 'all' : 'necessary')} className="h-11 rounded-btn bg-ink text-cream font-semibold text-[15px]">Save</button>
                </>
              ) : (
                <>
                  <button onClick={() => choose('necessary')} className="h-11 rounded-btn ring-1 ring-inset ring-sand font-semibold text-[15px]">Only necessary</button>
                  <button onClick={() => choose('all')} className="h-11 rounded-btn ring-1 ring-inset ring-sand font-semibold text-[15px]">Accept</button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
