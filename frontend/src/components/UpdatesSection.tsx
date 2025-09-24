import useScrollReveal from '../hooks/useScrollReveal';
import { updates } from '../data/updates';

const UpdatesSection = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="section updates" aria-labelledby="updates-heading">
      <div className="section__header">
        <p className="section__eyebrow">Stay in the loop</p>
        <h2 id="updates-heading">Latest updates</h2>
        <p className="section__lead">Announcements and spotlights from across the guild network.</p>
      </div>
      <div className="updates-grid">
        {updates.map(update => (
          <article key={update.id} className="update-card">
            <p className="update-card__category">{update.category}</p>
            <h3>{update.title}</h3>
            <p className="update-card__date">{update.date}</p>
            <p>{update.description}</p>
            <button type="button" className="link-button">
              Read more
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UpdatesSection;
