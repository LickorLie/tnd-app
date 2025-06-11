import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
    { isOpen &&  <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed -inset-1 bg-black bg-opacity-50 backdrop-blur-lg"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="from-purple-400 rounded-3xl max-w-72 bg-fuchsia-500  text-white shadow-xl group-hover:bg-none group-hover:backdrop-blur-sm group-hover:text-gray-800 group-hover:bg-white relative z-10 hover:skew-x-12"
        > 
        <div className=' justify-between'>
        <div className="flex justify-center items-center pt-4 text-center">
                    <span className="text-lg font-bold text-center">Quick heads-up!</span>
                    <button
                      onClick={onClose}
                      className="text-gray-500 group hover:text-gray-700 absolute top-2 right-2 rounded-full p-1 transition-colors duration-200 hover:bg-gray-200"
                    >
                      <X size={20} className='text-white group-hover:text-black' />
                    </button>
                  </div>
          <div className="p-4">
            <p className="mb-4 p-0  text-center">Right now, the app supports only "male" and "female" genders, and "straight" or "bisexual" orientations. <br/>
                <br/>We’re working hard to make it fully inclusive soon. <br /><br />Thanks for your patience and understanding! 💖🍍</p>
          </div>

        </div>
        </motion.div>
        
      </div>
    </AnimatePresence>}
    </>
  );
};

export default InfoModal;