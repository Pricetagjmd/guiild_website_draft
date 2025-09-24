import { useMemo, useState } from 'react';
import { vaultEntries } from '../data/vaultEntries';
import './pages.css';
import './vault.css';

const VaultPage = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = useMemo(() => ['All', ...new Set(vaultEntries.flatMap((entry) => entry.tags))], []);

  const filteredEntries = useMemo(() => {
    if (selectedTag === 'All') return vaultEntries;
    return vaultEntries.filter((entry) => entry.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <section className="page-section vault">
      <header>
        <p className="section-eyebrow">Institutional memory</p>
        <h1 className="section-title">The Vault</h1>
        <p>
          Preserve the Guild’s living history. Browse landmark initiatives, cultural milestones, and the people who shaped our
          community. Future releases will include oral histories, multimedia archives, and digitized documents.
        </p>
      </header>
      <div className="vault__filters" role="tablist" aria-label="Vault filters">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            role="tab"
            aria-selected={selectedTag === tag}
            className={selectedTag === tag ? 'vault__filter vault__filter--active' : 'vault__filter'}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <ol className="vault__timeline">
        {filteredEntries.map((entry) => (
          <li key={`${entry.title}-${entry.year}`}>
            <article className="vault__card">
              <div className="vault__year">{entry.year}</div>
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
                <ul className="vault__tags">
                  {entry.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>
      <section className="vault__cta">
        <h2>Contribute to the Vault</h2>
        <p>
          Do you have photos, audio, or stories from past guild programs? We’re building a submission portal so that alumni,
          students, and community partners can help us grow the archive.
        </p>
        <button type="button">Notify me when submissions open</button>
      </section>
    </section>
  );
};

export default VaultPage;
