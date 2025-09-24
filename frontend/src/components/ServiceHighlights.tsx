import useScrollReveal from '../hooks/useScrollReveal';
import { serviceHighlights } from '../data/serviceHighlights';

const ServiceHighlights = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="section service-highlights" aria-labelledby="service-highlights-heading">
      <div className="section__header">
        <p className="section__eyebrow">What we offer</p>
        <h2 id="service-highlights-heading">Service highlights</h2>
        <p className="section__lead">
          Signature programs that keep members experimenting, learning, and shipping meaningful work together.
        </p>
      </div>
      <div className="service-grid">
        {serviceHighlights.map(highlight => (
          <article key={highlight.id} className="service-card">
            <h3>{highlight.name}</h3>
            <p>{highlight.summary}</p>
            <button type="button" className="link-button">
              {highlight.linkLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServiceHighlights;
