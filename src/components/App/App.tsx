import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Place from '../Page/Place/Place';
import './App.scss';
import React, { createContext, useEffect, useState } from 'react';
import Error404 from '../Error/Error404';
import Page from '../Page/Page';
import LegalMentions from '../Page/Form/LegalMentions';
import SuggestForm from '../Page/Form/SuggestForm';
import ContactForm from '../Page/Form/ContactForm';
import Cookies from 'js-cookie';
import { CategoriesList, CenturiesList, TagsList } from '../contexts';
import {
  useCategoriesList,
  useTagsList,
  useCenturiesList,
} from '../Api/ApiDataList';
import { ContextType } from '../../@types';

export const Context = React.createContext<ContextType | undefined>(undefined);

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menueVisible, setMenueVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('jwtToken'));
  const [loginModal, setLoginModal] = useState(false);

  const [userData, setUserData] = useState();
  const [token, setToken] = useState();

  const categoriesList = useCategoriesList();
  const centuriesList = useCenturiesList();
  const tagsList = useTagsList();

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
