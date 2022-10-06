import React, { useContext, useEffect, useState } from 'react';

// import context
import { HouseContext } from './HouseContext';
// import components
import House from './House';
// import link
import { Link } from 'react-router-dom';
// import icons
import { ImSpinner2 } from 'react-icons/im';
import Pagination from './pagination';


const pagesize = 6;

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterHouses, setFilterHouses] = useState([]);


  useEffect(() => {
    if (houses) {
      if(houses.length > 0 ){
        setTotalPage(Math.ceil(houses.length / pagesize));
        handleHouses(currentPage);
      }
    }
  }, [houses])

  if (loading) {
    return (
      <ImSpinner2 className='mx-auto animate-spin text-blue-800 text-4xl mt-[200px]' />
    );
  }

  if (houses.length < 1) {
    return (
      <div className='text-center text-3xl text-gray-400 mt-48'>
        Desculpe, não encontramos nada nessas especificações.
      </div>
    );
  }

  const handleHouses = (page) => {
    let _houses = houses.slice((page - 1) * pagesize, page * pagesize);
    setFilterHouses(_houses);
  }

  const handleBackPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => --prev);
      handleHouses(currentPage - 1);
    }
  }
  const handleNextPage = () => {
    if (currentPage < (totalPage )) {
      setCurrentPage((prev) => ++prev);
      handleHouses(currentPage + 1);
    }

  }

  return (
    <section className='mb-20 mt-20'>
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'>
          {filterHouses.map((house, index) => {
            return (
              <Link to={`/casa/${house.name}`} key={index}>
                <House house={house} />
              </Link>
            );
          })}

        </div>
        {
          houses.length > 6 &&
          <Pagination
            postsPerPage={pagesize}
            totalPosts={houses.length}
            paginateBack={handleBackPage}
            paginateFront={handleNextPage}
            currentPage={ currentPage}
          />
        }
      </div>
    </section>
  );
};

export default HouseList;
