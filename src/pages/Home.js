import React from 'react';
import { TabTitle } from '../utils/GeneralFunctions';

// import components
import HouseList from '../components/HouseList';
import Banner from '../components/Banner';

const Home = () => {
  TabTitle('Polaris Empreendimentos');

  return (
    <div className='min-h-[1800px]'>
      <Banner />
      <HouseList />
    </div>
  );
};

export default Home;
