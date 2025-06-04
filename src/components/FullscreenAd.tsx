import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { supabase } from '../utils/supabase';

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
    window.open(adData.link, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <span className="text-white font-medium">{timeLeft}s</span>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <X className="text-white" size={24} />
            </div>
          </div>

          <motion.div
            className="w-full max-w-2xl p-4 cursor-pointer"
            onClick={handleAdClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative aspect-video rounded-2xl bg-gradient-to-br bg-black">
              {/* Ad Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
{adData && (
                  <a
            
            href={adData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="relative h-48">
                <img
                  src={adData.image}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {adData.discount}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{adData.title}</h3>
                  <ExternalLink className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </div>
                <p className="text-gray-600">{adData.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-purple-500 font-semibold">Learn More</span>
                  <span className="text-sm text-gray-500">Limited Time Offer</span>
                </div>
              </div>
            </div>
          </a>
              )}
              </div>

              {/* Progress Bar */}
              <div className="absolute -top-36 left-0 right-0 h-1 bg-white/20">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 10, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenAd;