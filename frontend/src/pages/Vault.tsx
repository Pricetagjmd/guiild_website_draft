import SearchBar from '../components/SearchBar';
import useScrollReveal from '../hooks/useScrollReveal';

const Vault = () => {
  const introRef = useScrollReveal<HTMLElement>({ threshold: 0.25 });
  const collectionRef = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  return (
    <div className="page vault-page">
      <section ref={introRef} className="page-section">
        <div className="page-section__header">
          <h2>Vault</h2>
          <p>A living library of templates, recordings, and shared playbooks from every corner of the guild.</p>
        </div>
        <SearchBar placeholder="Search vault" variant="dark" />
      </section>
      <section ref={collectionRef} className="page-section">
        <div className="vault-grid">
          <article className="vault-card">
            <h3>Strategy Playbooks</h3>
            <p>Quarterly planning canvases, scenario planning worksheets, and success metric dashboards.</p>
            <button type="button" className="link-button">
              Preview collection
            </button>
          </article>
          <article className="vault-card">
            <h3>Workshop Kits</h3>
            <p>Facilitation guides, slide decks, and activity boards ready for your next chapter meetup.</p>
            <button type="button" className="link-button">
              Explore kits
            </button>
          </article>
          <article className="vault-card">
            <h3>Member Journey Library</h3>
            <p>Annotated blueprints for onboarding, retention plays, and surprise-and-delight moments.</p>
            <button type="button" className="link-button">
              View blueprints
            </button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Vault;
