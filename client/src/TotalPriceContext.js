import React, { createContext, useState, useContext } from 'react';

const TotalPriceContext = createContext();

export const TotalPriceProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
      {children}
    </TotalPriceContext.Provider>
  );
};

export const useTotalPrice = () => useContext(TotalPriceContext);
