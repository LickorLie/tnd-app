import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FullscreenAdProps {
  onComplete: () => void;
}

const FullscreenAd: React.FC<FullscreenAdProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isVisible, setIsVisible] = useState(true);

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
    window.open('https://example.com/sponsor', '_blank');
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
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
              {/* Ad Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                <h2 className="text-4xl font-bold mb-4">
                  🎮 Truth or Dare Premium
                </h2>
                <p className="text-xl mb-6">
                  Unlock exclusive content and spicy challenges!
                </p>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-semibold">
                  Click to Learn More
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
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