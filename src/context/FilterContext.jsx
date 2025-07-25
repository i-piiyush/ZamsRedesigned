import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 5000], // Default range, will be updated with actual data
    tags: [],
    searchQuery: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <FilterContext.Provider value={{ 
      filters, 
      setFilters, 
      isFilterOpen, 
      setIsFilterOpen 
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);