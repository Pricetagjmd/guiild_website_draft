import './pages.css';

type PlaceholderPageProps = {
  title: string;
};

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <section className="placeholder">
      <h1>{title}</h1>
      <p>This section is being prepared. Check back soon for updates from the University Guild.</p>
    </section>
  );
};

export default PlaceholderPage;
