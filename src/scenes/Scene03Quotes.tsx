import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';
import { motion } from 'framer-motion';
import 'swiper/css';
import { SceneWrapper } from '@/components/common/SceneWrapper';
import { NightSky } from '@/components/backgrounds/NightSky';
import { FloatingHearts } from '@/components/backgrounds/FloatingHearts';
import { Button } from '@/components/common/Button';
import { ProgressDots } from '@/components/common/ProgressDots';
import { config } from '@/config';
import { useExperience } from '@/context/ExperienceContext';

export default function Scene03Quotes() {
  const { goNext } = useExperience();
  const [active, setActive] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const isLast = active === config.quotes.length - 1;

  const handleContinue = () => {
    if (isLast) {
      goNext();
    } else {
      swiperRef.current?.slideNext();
    }
  };

  return (
    <SceneWrapper className="gap-6">
      <NightSky withMoon={false} />
      <FloatingHearts count={6} />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-10">
        <Swiper
          className="w-full"
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActive(s.activeIndex)}
          spaceBetween={24}
        >
          {config.quotes.map((quote, i) => (
            <SwiperSlide key={i}>
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-xs text-balance text-center font-display text-2xl italic leading-relaxed text-blush glow-text"
              >
                “{quote}”
              </motion.blockquote>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex flex-col items-center gap-5">
          <ProgressDots total={config.quotes.length} current={active} />
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </div>
    </SceneWrapper>
  );
}
