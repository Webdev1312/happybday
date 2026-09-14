import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { Button } from '@/components/common/Button';
import { config } from '@/config';
import { useExperience } from '@/context/ExperienceContext';

export default function Scene06Gallery() {
  const { goNext } = useExperience();
  const [zoomed, setZoomed] = useState<string | null>(null);

  return (
    <SceneWrapper className="gap-6">
      <div className="absolute inset-0 bg-night-gradient" />

      <h2 className="relative z-10 font-display text-3xl text-blush glow-text">Memory Gallery</h2>

      <div className="relative z-10 h-[65%] w-full max-w-sm overflow-hidden rounded-3xl shadow-glow">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {config.gallery.map((item) => (
            <SwiperSlide key={item.id}>
              <button
                onClick={() => setZoomed(item.src)}
                className="relative h-full w-full overflow-hidden"
                aria-label={`Zoom photo: ${item.caption}`}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="h-full w-full scale-105 animate-[kenburns_9s_ease-in-out_infinite_alternate] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="font-script text-lg text-blush">{item.caption}</p>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Button onClick={goNext} className="relative z-10">
        Continue
      </Button>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              src={zoomed}
              alt="Zoomed memory"
              className="max-h-full max-w-full rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.18) translate(-2%, -2%); }
        }
      `}</style>
    </SceneWrapper>
  );
}
