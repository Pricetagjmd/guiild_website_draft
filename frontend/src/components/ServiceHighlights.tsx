import './service-highlights.css';

const services = [
  {
    title: 'Student Advocacy',
    description: 'We champion policy change, organize feedback forums, and ensure every voice finds a platform with university leadership.'
  },
  {
    title: 'Community Resources',
    description: 'Reserve event spaces, access financial guidance, or tap into specialized support for clubs and societies.'
  },
  {
    title: 'Career & Mentorship',
    description: 'Connect with alumni mentors, gain internship prep, and attend skill-building clinics hosted each semester.'
  }
];

const ServiceHighlights = () => (
  <section className="service-highlights">
    <header>
      <p className="section-eyebrow">What we do</p>
      <h2>Support that scales with your ambitions</h2>
    </header>
    <div className="service-grid">
      {services.map((service) => (
        <article key={service.title} className="service-card">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </article>
      ))}
    </div>
  </section>
);

export default ServiceHighlights;
