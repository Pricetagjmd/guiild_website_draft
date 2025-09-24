import './updates-section.css';

type Update = {
  title: string;
  category: string;
  summary: string;
  date: string;
};

const updates: Update[] = [
  {
    title: 'Guild partners with local community garden',
    category: 'Sustainability',
    summary: 'Volunteers will cultivate fresh produce for the campus pantry and offer weekly workshops on urban gardening.',
    date: '2024-02-03'
  },
  {
    title: 'Spring festival applications now open',
    category: 'Events',
    summary: 'Student groups can apply for booth space, performance slots, and collaborative pop-ups through March 12.',
    date: '2024-01-28'
  },
  {
    title: 'New archive collection digitized',
    category: 'Vault',
    summary: 'Historic guild newsletters from the 1950s have been digitized and added to the Vault for public browsing.',
    date: '2024-01-18'
  }
];

const UpdatesSection = () => (
  <section className="updates">
    <header>
      <p className="section-eyebrow">Latest updates</p>
      <h2>What’s happening across the Guild</h2>
    </header>
    <div className="updates__list">
      {updates.map((item) => (
        <article key={item.title} className="update-card">
          <span className="update-card__category">{item.category}</span>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <time dateTime={item.date}>{new Date(item.date).toLocaleDateString()}</time>
        </article>
      ))}
    </div>
  </section>
);

export default UpdatesSection;
