import useScrollReveal from '../hooks/useScrollReveal';

interface PlaceholderProps {
  title: string;
  description: string;
}

const Placeholder = ({ title, description }: PlaceholderProps) => {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0.3 });

  return (
    <div className="page placeholder-page">
      <section ref={sectionRef} className="page-section">
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="placeholder-note">
          We are actively collecting member stories and program materials to shape this space. Check back soon!
        </p>
      </section>
    </div>
  );
};

export default Placeholder;
