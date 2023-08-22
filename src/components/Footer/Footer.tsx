import { NavLink } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <nav className="footer-container">
      <NavLink to="/mentions_legales"> Mentions Légales </NavLink>
      <NavLink to="/contact"> Contactez-nous</NavLink>
      <NavLink to="/proposer"> Suggestion d'un lieu</NavLink>
    </nav>
  );
};

export default Footer;
