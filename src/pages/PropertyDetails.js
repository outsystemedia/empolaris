import React from 'react';
import emailjs from "emailjs-com";

// import houseData
import { housesData } from '../data';
//  useParams
import { useParams } from 'react-router-dom';
// import icons
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import { RiHome5Line } from 'react-icons/ri';
// import link
import { Link } from 'react-router-dom';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PropertyDetails = () => {
  const { id } = useParams();

  const property = housesData.find((house) => {
    return house.name === id;
  });

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('site_polaris', 'polaris_emailjs_formcasa', e.target, '-ZykkYn2ZaJN1SGtS')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()
  }

  return (
    <div className='container mx-auto min-h-[800px] mb-14'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <h2 className='text-2xl font-semibold'>{property.name}</h2>
        </div>
        <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
          {/* <div className='bg-blue-800 rounded-full text-white px-3 inline-block'>
            {property.type}
          </div> */}
          <div className='bg-blue-800 rounded-full text-white px-3 inline-block'>
            {property.country}
          </div>
          <div className='bg-red-500 rounded-full text-white px-2 inline-block empty:hidden'>
            {property.tag}
          </div>
          {/* <div className='bg-green-800 rounded-full text-white px-2 inline-block empty:hidden'>
            {property.status}
          </div> */}
          <div className={`rounded-full text-white px-2 inline-block empty:hidden ${property.isAvailable === "Disponível" ? 'bg-green-800' : 'bg-red-500'}`}>
          {property.isAvailable}
          </div>
        </div>
        <div className='text-3xl font-semibold text-blue-800'>
          R$ {property.pricepage}
        </div>
      </div>
      <div className='flex gap-x-6 text-blue-800 mb-6'>
            <div className='flex gap-x-2 items-center'>
              <BiBed className='text-2xl' />
              <div className='text-lg font-medium'>{property.bedrooms}</div>
            </div>
            <div className='flex gap-x-2 items-center'>
              <BiBath className='text-2xl' />
              <div className='text-lg font-medium'>{property.bathrooms}</div>
            </div>
            <div className='flex gap-x-2 items-center'>
              <BiArea className='text-2xl' />
              <div className='text-lg font-medium'>{property.surface}</div>
            </div>
            <div className='flex gap-x-1 items-center'>
              <RiHome5Line className='text-2xl' />
              <div className='text-lg font-medium'>{property.built}</div>
            </div>
          </div>
      <div className='flex flex-col items-start gap-8 lg:flex-row'>
        <div className='max-w-[768px]'>
            <div className='mb-8'>
              <img src={property.fachada} alt='' />
            </div>
          <div className='mb-8'>
            <div>
              <h2 className='text-2xl font-semibold'>Detalhes</h2>
              <Carousel showThumbs={false} autoPlay={false} showArrows={true} infiniteLoop={true}>
                {
                  property.carouselData.map((item,index)=>(
                    <>
                    {
                      item.image 
                      ? <img key={index} className='h-[600px] w-100 object-contain' src={item.image} alt='' />
                      :   <iframe className=" w-full h-full" src={item.video} title="Video" allowFullScreen></iframe>

                    }
                    </>
                  ))
                }
         
              </Carousel>
            </div>
          </div>
          <p>{property.description}</p>
          <br></br>
          <div className='max-w-[768px]'>
            <h2 className='text-2xl font-semibold'>Localização</h2>
            <h3 className='text-base mb-4'>{property.address}</h3>
            <div className='mb-8'>
              <img src={property.location} alt='' />
            </div>
          </div>
        </div>
        <div className='flex-1 w-full mb-8 bg-white border border-gray-300 rounded-lg px-6 py-8'>
          <div className='flex items-center gap-x-4 mb-8'>
            <div className='w-20 h-20 p-1 border border-gray-300 rounded-full'>
              <img src={property.agent.image} alt="Corretor"></img>
            </div>
            <div>
              <div className='font-bold text-lg'>{property.agent.name}</div>
              <Link to='/' className='text-blue-800 text-sm'>
                Ver todas as casas
              </Link>
            </div>
          </div>
          <form className='flex flex-col gap-y-4' onSubmit={sendEmail}>
            <input
              className='border border-gray-300 focus:border-blue-800 rounded w-full px-4 h-14 text-sm outline-none'
              type='text'
              placeholder='Nome*'
              name='name'
            />
            <input
              className='border border-gray-300 focus:border-blue-800 rounded w-full px-4 h-14 text-sm outline-none'
              type='email'
              name='email'
              placeholder='Email*'
            />
            <input
              className='border border-gray-300 focus:border-blue-800 rounded w-full px-4 h-14 text-sm outline-none'
              type='text'
              name='tel'
              placeholder='Celular*'
            />
            <textarea
              className='border border-gray-300 focus:border-blue-800 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none'
              type='text'
              name='message'
              placeholder='Mensagem*'
              defaultValue='Olá, gostaria de um atendimento, tenho interesse na casa:'
            />
            <div className='flex gap-x-2'>
              <input
                className='bg-blue-800 hover:bg-blue-800 text-white rounded p-4 text-sm w-full transition'
                type='submit'
                value="Entrar em contato"
              >
              </input>
              {/* <a href='tel:+554732241847'><button className='border border-blue-800 text-blue-800 hover:border-purple-600 hover:text-purple-600 rounded p-4 text-sm w-full transition'>
                Ligar
              </button></a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
