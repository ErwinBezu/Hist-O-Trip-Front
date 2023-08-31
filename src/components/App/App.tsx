import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Home/Home';
import Place from '../Place/Place';
import './App.scss';
import React, { createContext, useState } from 'react';
import Error404 from '../Error/Error404';

import Cookies from 'js-cookie';

import Contact from '../Contact/Contact';

type ContextType = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  menueVisible: boolean;
  setMenueVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editVisible: boolean;
  setEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
};


export const Context = React.createContext<ContextType | undefined>(undefined);

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menueVisible, setMenueVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const [selectedCate, setSelectedCate] = useState();
  const [resultAPI, setResultAPI] = useState();
  const [signUpModal, setSignUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('jwtToken'));
  // const url = useLocation();

  return (
    <Context.Provider value={{signUpModal, setSignUpModal, isLoggedIn, setIsLoggedIn, isVisible, setIsVisisble, menueVisible,resultAPI, setResultAPI, setMenueVisible, editVisible, selectedCate, setSelectedCate, setEditVisible}}>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/mentions_legales" element={<LegalMentions />} />
      <Route path="/proposer" element={<Suggest />} /> */}
        <Route path="/:id/:slug" element={<Place />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Context.Provider>
  );
};

export default App;
