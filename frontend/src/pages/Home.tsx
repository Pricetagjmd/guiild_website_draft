import useScrollReveal from '../hooks/useScrollReveal';

const Home = () => {
  const introRef = useScrollReveal<HTMLElement>({ threshold: 0.25 });
  const focusRef = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  return (
    <div className="page home-page">
      <section ref={introRef} className="page-section">
        <h2>Welcome to the Guild Collective</h2>
        <p>
          We are a distributed network of practitioners obsessed with building remarkable member experiences. Explore our
          programs, attend an upcoming event, and contribute to the shared resource vault.
        </p>
      </section>
      <section ref={focusRef} className="page-section page-section--accent">
        <h3>Focus areas this season</h3>
        <ul className="focus-list">
          <li>
            <h4>Member Journey Mapping</h4>
            <p>Deep dives on onboarding improvements and ways to sustain engagement beyond the first 90 days.</p>
          </li>
          <li>
            <h4>Experiment Design</h4>
            <p>Shared frameworks for piloting programs with measurable impact on member retention and satisfaction.</p>
          </li>
          <li>
            <h4>Chapter Enablement</h4>
            <p>Toolkits that help each chapter operate autonomously while staying aligned on guild-wide goals.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
