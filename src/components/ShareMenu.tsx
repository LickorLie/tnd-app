import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  MessageCircle, 
  Camera, 
  Video, 
  MessageSquare,
  Phone
} from 'lucide-react';
import Modal from './Modal';

interface ShareMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (platform: string) => void;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ isOpen, onClose, onShare }) => {
  const shareOptions = [
    { id: 'snapchat', icon: Camera, label: 'Snapchat', color: 'bg-yellow-400', emoji: '👻' },
    { id: 'instagram', icon: MessageCircle, label: 'Instagram', color: 'bg-pink-500', emoji: '📸' },
    { id: 'tiktok', icon: Video, label: 'TikTok', color: 'bg-black', emoji: '🎵' },
    { id: 'whatsapp', icon: MessageSquare, label: 'WhatsApp', color: 'bg-green-500', emoji: '💬' },
    { id: 'sms', icon: Phone, label: 'SMS', color: 'bg-blue-500', emoji: '📱' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Game">
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {shareOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => onShare(option.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-colors border border-gray-200"
            >
              <div className={`${option.color} p-3 rounded-full text-white mb-2`}>
                <option.icon size={24} />
              </div>
              <span className="text-sm font-medium text-gray-700">{option.label}</span>
              <span className="text-2xl mt-1">{option.emoji}</span>
            </motion.button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Share this game with your friends! 🎮
        </p>
      </div>
    </Modal>
  );
};

export default ShareMenu;