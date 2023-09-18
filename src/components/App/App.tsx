import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Place from '../Place/Place';
import './App.scss';
import React, { createContext, useEffect, useState } from 'react';
import Error404 from '../Error/Error404';
import Page from '../Page/Page';
import LegalMentions from '../Page/Form/LegalMentions';
import SuggestForm from '../Page/Form/SuggestForm';
import ContactForm from '../Page/Form/ContactForm';
import Cookies from 'js-cookie';
import { CategoriesList, CenturiesList, TagsList } from '../contexts';
import apiUrl from './config';

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
  userData: any;
  setUserData: any;
  token?: string | null; // Add token property
  setToken?: any;
  loginModal: any;
  setLoginModal: any;
};

export const Context = React.createContext<ContextType | undefined>(undefined);

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menueVisible, setMenueVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('jwtToken'));
  const [loginModal, setLoginModal] = useState(false);

  const [categoriesList, setCategoriesList] = useState([]);
  const [centuriesList, setCenturiesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const [userData, setUserData] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    fetch(`${apiUrl}/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategoriesList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/tags`)
      .then((response) => response.json())
      .then((data) => {
        setTagsList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/centuries`)
      .then((response) => response.json())
      .then((data) => {
        setCenturiesList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <CenturiesList.Provider value={centuriesList}>
      <CategoriesList.Provider value={categoriesList}>
        <TagsList.Provider value={tagsList}>
          <Context.Provider
            value={{
              signUpModal,
              setSignUpModal,
              isLoggedIn,
              setIsLoggedIn,
              isVisible,
              setIsVisible,
              menueVisible,
              setMenueVisible,
              editVisible,
              setEditVisible,
              token,
              setToken,
              userData,
              setUserData,
              loginModal,
              setLoginModal,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Page />}>
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/mentions_legales" element={<LegalMentions />} />
                <Route path="/proposer" element={<SuggestForm />} />
              </Route>
              <Route path="/:id/:slug" element={<Place />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Context.Provider>
        </TagsList.Provider>
      </CategoriesList.Provider>
    </CenturiesList.Provider>
  );
};

export default App;
