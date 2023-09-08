import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { useContext } from 'react';
import { Context } from '../App/App';

type ContextType = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  menueVisible: boolean;
  setMenueVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editVisible: boolean;
  setEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  signUpModal: boolean;
  setSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData?: any;
  setUserData: any;
  token?: string | null; // Add token property
  setToken?: React.Dispatch<React.SetStateAction<string | null>>; // Add setToken property
};

const Footer = () => {
  const { isLoggedIn } = useContext<any>(Context);

  return (
    <nav className="footer-container">
      <NavLink to="/mentions_legales"> Mentions Légales </NavLink>
      <NavLink to="/contact"> Contactez-nous</NavLink>

      {isLoggedIn ? (
        <NavLink to="/proposer"> Suggestion d'un lieu</NavLink>
      ) : (
        ''
      )}
    </nav>
  );
};

export default Footer;
