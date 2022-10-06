import React from 'react';

// import icons
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import { RiHome5Line } from 'react-icons/ri';

const House = ({ house }) => {
  return (
    <div className='bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition'>
      <img className='mb-8' src={house.image} alt='' />
      <div className='mb-4 flex gap-x-2 text-sm'>
        {/* <div className='bg-blue-800 rounded-full text-white px-3 inline-block'>
          {house.type}
        </div> */}
        <div className='bg-blue-800 rounded-full text-white px-3 inline-block'>
          {house.country}
        </div>
        <div className='bg-red-500 rounded-full text-white px-2 inline-block empty:hidden'>
          {house.tag}
        </div>
        {/* <div className='bg-green-800 rounded-full text-white px-2 inline-block empty:hidden'>
          {house.status}
        </div> */}
        <div className={`rounded-full text-white px-2 inline-block empty:hidden ${house.isAvailable === "Disponível" ? 'bg-green-800' : 'bg-red-500'}`}>
        {house.isAvailable}
        </div>
      </div>
      <div className='text-lg font-semibold max-w-[260px]'>{house.name}</div>
      <div className='flex gap-x-4 my-4'>
        <div className='flex items-center text-gray-600 gap-1'>
          <div className='text-[20px] rounded-full'>
            <BiBed />
          </div>
          <div className='text-base'>{house.bedrooms}</div>
        </div>
        <div className='flex items-center text-gray-600 gap-1'>
          <div className='text-[20px] rounded-full'>
            <BiBath />
          </div>
          <div className='text-base'>{house.bathrooms}</div>
        </div>
        <div className='flex items-center text-gray-600 gap-1'>
          <div className='text-[20px] rounded-full'>
            <BiArea />
          </div>
          <div className='text-base'>{house.surface}</div>
        </div>
        <div className='flex items-center text-gray-600 gap-1 '>
          <div className='text-[20px] rounded-full '>
            <RiHome5Line />
          </div>
          <div className='text-base'>{house.built}</div>
        </div>
      </div>
      <div className='text-lg font-semibold text-blue-600 mb-4'>
        R$ {house.pricepage}
      </div>
    </div>
  );
};

export default House;
