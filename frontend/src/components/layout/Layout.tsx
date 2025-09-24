import { PropsWithChildren } from 'react';
import './layout.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import BackToTopButton from './BackToTopButton';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
