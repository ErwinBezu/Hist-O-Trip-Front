// /* eslint-disable react/function-component-definition */
// import Home from '../Home/Home';
// import Place from '../Place/Place';
// import './App.scss';

// const App = () => {
//   return (
//    // <Home />
//   <Place />
//   )
// };

// export default App;

/* eslint-disable react/function-component-definition */
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Home/Home';
import Place from '../Place/Place';
import './App.scss';
import React, { createContext, useState } from 'react';
export const Context = React.createContext();

const App = () => {
  const [isVisible, setIsVisisble] = useState(false);
  const [menueVisible, setMenueVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedCate, setSelectedCate] = useState();
  const [resultAPI, setResultAPI] = useState();
  
  // const url = useLocation();
  return (
    <Context.Provider value={{isVisible, setIsVisisble, menueVisible,resultAPI, setResultAPI, setMenueVisible, editVisible, selectedCate, setSelectedCate, setEditVisible}}>
      <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
      {/* <Route path="/mentions_legales" element={<LegalMentions />} />
      <Route path="/proposer" element={<Suggest />} /> */}
      <Route path="/:id/:slug" element={<Place />} />
      
    </Routes>
    </Context.Provider>
  );
};

export default App;
