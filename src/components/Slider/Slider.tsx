'use client';

import { motion } from 'framer-motion';
import SlideOne from './SlideOne';
import SlideTwo from './SlideTwo';

function Slider() {
  const slides = [
    <SlideOne key="slide1" />,
    <SlideTwo key="slide2" />,
  ];
  return (
    <div className="relative mb-10 h-20 w-full md:mb-15 md:h-40 xl:mb-20 xl:h-50">
      {slides.map((slide, index) => (
        <motion.div
          key={`slide-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: slides.length * 5 - 5,
            delay: index * 5,
          }}
          className="absolute h-full w-full"
        >
          {slide}
        </motion.div>
      ))}
    </div>
  );
}

export default Slider;
