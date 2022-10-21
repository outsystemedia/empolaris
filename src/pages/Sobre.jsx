import React from 'react';
import '../assets/styles/button.css'
import HeroHome from '../components/Sobre/HeroHome';
import FeaturesHome from '../components/Sobre/Features';
import FeaturesBlocks from '../components/Sobre/FeaturesBlocks';
import Testimonials from '../components/Sobre/Testimonials';
import Newsletter from '../components/Sobre/Newsletter';
import { TabTitle } from '../utils/GeneralFunctions';

function Sobre() {
  TabTitle('Sobre nós | Polaris Empreendimentos');

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter />

      </main>

    </div>
  );
}

export default Sobre;