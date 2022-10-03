import React, { createContext, useState, useEffect } from 'react';

// import data
import { housesData } from '../data';

// create context
export const HouseContext = createContext();

// provider
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Cidades (todos)');
  const [availeableFilters, setAvaileableFilters] = useState(['Disponibilidade (todos)', 'Disponível', 'Vendida']);
  const [availableFilter, setavailableFilter] = useState('Disponibilidade (todos)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Tipo de Casa (todos)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Valores (todos)');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // return all countries
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // remove duplicates
    const uniqueCountries = ['Cidades (todos)', ...new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
  }, []);

  useEffect(() => {
    // return only countries
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // remove duplicates
    const uniqueProperties = ['Tipo de Casa (todos)', ...new Set(allProperties)];

    // set countries state
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    setLoading(true);
    // check the string if includes '(todos)'
    const isDefault = (str) => {
      return str.split(' ').includes('(todos)');
    };

    // get first string (price) and parse it to number
    const minPrice = parseInt(price.split(' ')[0]);
    // get last string (price) and parse it to number
    const maxPrice = parseInt(price.split(' ')[2]);
    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      // all values are selected
      if (
        house.country === country &&
        house.type === property &&
        house.isAvailable === availableFilter &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      // all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price) && isDefault(availableFilter)) {
        return house;
      }
      // country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price) && isDefault(availableFilter)) {
        return house.country === country;
      }
      // property is not default
      if (!isDefault(property) && isDefault(country) && isDefault(price) && isDefault(availableFilter)) {
        return house.type === property;
      }
      // price is not default
      if (!isDefault(price) && isDefault(country) && isDefault(property) && isDefault(availableFilter)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }
      // available filter is not default
      if (isDefault(property) && isDefault(country) && isDefault(price) && !isDefault(availableFilter)) {
        return house.isAvailable === availableFilter;
      }


      // country and property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price) && isDefault(availableFilter)) {
        return house.country === country && house.type === property;
      }
      // country and price is not default
      if (!isDefault(country) && isDefault(property) && !isDefault(price) && isDefault(availableFilter)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }
      // country and available filter not default
      if (!isDefault(country) && isDefault(property) && isDefault(price) && !isDefault(availableFilter)) {
        return house.country === country && house.isAvailable === availableFilter;
      }

      // property and price is not default
      if (isDefault(country) && !isDefault(property) && !isDefault(price) && isDefault(availableFilter)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }

      // property and available is not default
      if (isDefault(country) && !isDefault(property) && isDefault(price) && !isDefault(availableFilter)) {
        return house.type === property && house.isAvailable === availableFilter;
      }
      // price and available filter is not default
      if (isDefault(country) && isDefault(property) && !isDefault(price) && !isDefault(availableFilter)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.isAvailable === availableFilter;
        }
      }
      if (!isDefault(country) && !isDefault(property) && !isDefault(price) && isDefault(availableFilter)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country  && house.type === property;
        }
      }
      if (isDefault(country) && !isDefault(property) && !isDefault(price) && !isDefault(availableFilter)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.isAvailable === availableFilter  && house.type === property;
        }
      }
      if (!isDefault(country) && isDefault(property) && !isDefault(price) && !isDefault(availableFilter)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.isAvailable === availableFilter && house.country === country;
        }
    }
      if (!isDefault(country) && !isDefault(property) && isDefault(price) && !isDefault(availableFilter)) {
          return house.isAvailable === availableFilter  && house.type === property && house.country === country;
      }
    });
    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        handleClick,
        setavailableFilter,
        availeableFilters,
        availableFilter,
        houses,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
