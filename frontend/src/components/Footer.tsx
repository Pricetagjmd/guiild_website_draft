import useScrollReveal from '../hooks/useScrollReveal';

const Footer = () => {
  const footerRef = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  return (
    <footer ref={footerRef} className="site-footer" aria-label="Footer">
      <div className="site-footer__inner">
        <div>
          <h3>Guild Collective</h3>
          <p>
            Designing better member experiences through collaboration, shared learning, and purposeful experiments.
          </p>
        </div>
        <div>
          <h4>Visit</h4>
          <ul>
            <li>
              <a href="#">Guild HQ</a>
            </li>
            <li>
              <a href="#">Chapters</a>
            </li>
            <li>
              <a href="#">Press kit</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="#">Slack</a>
            </li>
            <li>
              <a href="#">Newsletter</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="site-footer__note">© {new Date().getFullYear()} Guild Collective. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
