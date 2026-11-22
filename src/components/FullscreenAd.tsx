import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { track } from '../utils/analytics';

interface FullscreenAdProps {
  onComplete: () => void;
}

const FullscreenAd: React.FC<FullscreenAdProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isVisible, setIsVisible] = useState(true);
  const [adData, setAdData] = useState<any>(null);
  // Fetch ad data from Supabase of  full screen ads
  useEffect(() => {
    const fetchAdData = async () => {
      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('is_fullscreen', true)
        .single();

      if (error) {
        console.error('Error fetching ad data:', error);
      } else {
        setAdData(data);
        track('sponsor_view', { placement: 'fullscreen', sponsor: String(data?.title ?? '') });
      }
    };

    fetchAdData();
  }, []);

  useEffect(() => {

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsVisible(false);
          setTimeout(onComplete, 500); // Allow exit animation to complete
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleAdClick = () => {
    if (!adData) return;
    track('sponsor_click', { placement: 'fullscreen', sponsor: String(adData.title ?? '') });
    window.open(adData.link, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-cream"
        >
          {/* Voortgang: altijd de volle 10 seconden (afspraak met adverteerder) */}
          <div className="h-[3px] bg-sand">
            <motion.div className="h-full bg-rouge" initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 10, ease: 'linear' }} />
          </div>
          <div className="flex items-center justify-between px-5 h-14">
            <span className="font-serif font-semibold text-2xl">Lick <i className="text-rouge font-medium">or</i> Lie</span>
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-muted tabular-nums">{timeLeft}s <X size={18} strokeWidth={1.5} className="opacity-40" /></span>
          </div>
          <div className="flex-1 flex items-center justify-center p-5">
            {adData && (
              <a
                href={adData.link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => track('sponsor_click', { placement: 'fullscreen', sponsor: String(adData.title ?? '') })}
                className="block w-full max-w-md bg-paper rounded-card shadow-card overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-blush">
                  {adData.image && <img src={adData.image} alt="" className="w-full h-full object-cover" />}
                  {adData.discount && <span className="absolute top-3 right-3 bg-rouge text-rouge-ink text-[13px] font-semibold px-2.5 py-1 rounded-full">{adData.discount}</span>}
                </div>
                <div className="p-5">
                  <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blush mb-2">Partner</span>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-[26px] font-semibold leading-tight">{adData.title}</h3>
                    <ExternalLink size={18} strokeWidth={1.5} className="text-muted mt-1 shrink-0" />
                  </div>
                  {adData.description && <p className="text-muted mt-1">{adData.description}</p>}
                </div>
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenAd;
