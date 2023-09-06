import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { useContext } from 'react';
import { Context } from '../App/App';



const Footer = () => {

const { isLoggedIn}  = useContext(Context)

  return (
    <nav className="footer-container">
      <NavLink to="/mentions_legales"> Mentions Légales </NavLink>
      <NavLink to="/contact"> Contactez-nous</NavLink>

{isLoggedIn ? <NavLink to="/proposer"> Suggestion d'un lieu</NavLink> : ''}
      
    </nav>
  );
};

export default Footer;
