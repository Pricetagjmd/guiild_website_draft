import { useEffect, useMemo, useState } from 'react';
import './hero-carousel.css';

type Slide = {
  title: string;
  description: string;
  cta: string;
  accent: 'gold' | 'sky' | 'forest';
};

const slides: Slide[] = [
  {
    title: 'Guild Services, Tailored for You',
    description: 'From advocacy to student life resources, discover support crafted for every stage of your campus journey.',
    cta: 'Explore services',
    accent: 'gold'
  },
  {
    title: 'Celebrate Student Leadership',
    description: 'Meet the changemakers leading today’s initiatives and shaping tomorrow’s traditions.',
    cta: 'Meet our leaders',
    accent: 'sky'
  },
  {
    title: 'Spaces to Gather and Grow',
    description: 'Book guild venues, participate in co-working hubs, and tap into shared creative studios.',
    cta: 'View venues',
    accent: 'forest'
  }
];

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const accentClass = useMemo(() => `hero--accent-${slides[activeIndex].accent}`, [activeIndex]);

  return (
    <section className={`hero ${accentClass}`} aria-label="Guild highlights">
      <div className="hero__content">
        <p className="hero__eyebrow">University Guild</p>
        <h1>{slides[activeIndex].title}</h1>
        <p>{slides[activeIndex].description}</p>
        <button type="button" className="hero__cta">
          {slides[activeIndex].cta}
        </button>
      </div>
      <div className="hero__indicators" role="tablist" aria-label="Featured stories">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            className={activeIndex === index ? 'indicator indicator--active' : 'indicator'}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
