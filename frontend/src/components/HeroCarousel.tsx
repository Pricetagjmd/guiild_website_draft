import { useEffect, useMemo, useState } from 'react';
import { heroSlides } from '../data/heroSlides';

const accentClassMap = {
  crimson: 'hero-slide--crimson',
  gold: 'hero-slide--gold',
  slate: 'hero-slide--slate',
} as const;

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = useMemo(() => heroSlides, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length);
    }, 7000);

    return () => {
      window.clearInterval(id);
    };
  }, [slides.length]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  const activeSlide = slides[activeIndex];

  return (
    <section className="hero" aria-label="Featured guild highlights">
      <div className={`hero-slide ${accentClassMap[activeSlide.accent]}`}>
        <div className="hero-slide__content">
          <p className="hero-slide__eyebrow">Guild Collective</p>
          <h1>{activeSlide.title}</h1>
          <p>{activeSlide.description}</p>
          <button type="button" className="hero-slide__cta">
            {activeSlide.cta}
          </button>
        </div>
        <div className="hero-slide__controls" role="tablist" aria-label="Hero slides">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`View slide ${index + 1}: ${slide.title}`}
              className={index === activeIndex ? 'is-active' : ''}
              onClick={() => handleSelect(index)}
            >
              <span aria-hidden="true">{index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
