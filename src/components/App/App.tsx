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

const App = () => {
  // const url = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
      {/* <Route path="/mentions_legales" element={<LegalMentions />} />
      <Route path="/proposer" element={<Suggest />} /> */}
      <Route path="/:id/:slug" element={<Place />} />

    </Routes>
  );
};

export default App;
