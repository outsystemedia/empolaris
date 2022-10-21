import React, { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import ReactGA from 'react-ga4';

// import pages
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Sobre from './pages/Sobre.jsx'
import Contact5 from './pages/Contact';

ReactGA.initialize("G-YMJPXY9XVM");

const App = () => {

  useEffect(() => {
    //page view
    ReactGA.send(window.location.pathname + window.location.search);
  });

  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <ScrollToTop />
      <div className='pb-20'><Header /></div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/contato' element={<Contact5 />} />
        <Route path='/casa/:id' element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
