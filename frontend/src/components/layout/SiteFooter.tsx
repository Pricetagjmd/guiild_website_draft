import { useEffect, useRef, useState } from 'react';
import './layout.css';

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'YouTube', href: 'https://youtube.com' }
];

const SiteFooter = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = footerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <footer ref={footerRef} className={`site-footer ${isVisible ? 'site-footer--visible' : ''}`}>
      <div>
        <h3>Connect with the Guild</h3>
        <p>Follow along as we champion student voices across campus and beyond.</p>
        <ul className="site-footer__socials">
          {socials.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="site-footer__meta">
        <p>© {new Date().getFullYear()} University Guild. All rights reserved.</p>
        <p className="site-footer__tagline">Empowering community. Celebrating heritage. Building the future.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
