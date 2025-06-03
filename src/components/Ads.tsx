import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { supabase } from '../utils/supabase';

const Ads: React.FC = () => {
  // Fetch promotions from Supabase
  // const promotions = [
  //   {
  //     title: "Summer Sale",
  //     description: "Get 20% off on all summer items!",
  //     image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  //     link: "https://example.com/summer-sale",
  //     discount: "20% OFF"
  //   },
  //   {
  //     title: "New User Bonus",
  //     description: "Sign up now and get 100 bonus points!",
  //     image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84",
  //     link: "https://example.com/signup-bonus",
  //     discount: "100 POINTS"
  //   },
  //   {
  //     title: "Refer a Friend",
  //     description: "Refer a friend and both get a free month subscription!",
  //     image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
  //     link: "https://example.com/refer-friend",
  //     discount: "FREE MONTH"
  //   }
  // ];
  const [promotions, setPromotions] = useState<any[]>([]);
  useEffect(() => {
    const fetchPromotions = async () => {
      const { data, error } = await supabase
        .from('sponsors')
        .select('*').eq('is_fullscreen', false)

      if (error) {
        console.error('Error fetching promotions:', error);
      } else {
        setPromotions(data || []);
        console.log('Fetched promotions:', data);
      }
    };

    fetchPromotions();
  }
  , []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
      <div className="grid gap-6">
        {promotions.map((promo, index) => (
          <a
            key={index}
            href={promo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="relative h-48">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {promo.discount}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{promo.title}</h3>
                  <ExternalLink className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </div>
                <p className="text-gray-600">{promo.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-purple-500 font-semibold">Learn More</span>
                  <span className="text-sm text-gray-500">Limited Time Offer</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Ads;