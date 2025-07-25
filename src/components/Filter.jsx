import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';
import { useFilterContext } from '../context/FilterContext';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const Filter = () => {
  const { products } = useProductContext();
  const { filters, setFilters, isFilterOpen, setIsFilterOpen } = useFilterContext();
  
  const MIN_PRICE = 0;
  const MAX_PRICE = 5000;

  // Extract all unique tags, capitalized
  const allTags = [...new Set(products.flatMap(product => product.tags.map(capitalize)))];

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: [MIN_PRICE, MAX_PRICE]
    }));
  }, []);

  const handleTagToggle = (tag) => {
    const capitalizedTag = capitalize(tag);
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(capitalizedTag)
        ? prev.tags.filter(t => t !== capitalizedTag)
        : [...prev.tags, capitalizedTag]
    }));
  };

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = Math.min(MAX_PRICE, Math.max(MIN_PRICE, parseInt(value)));
    setFilters(prev => ({
      ...prev,
      priceRange: newPriceRange
    }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [MIN_PRICE, MAX_PRICE],
      tags: [],
      searchQuery: ''
    });
  };

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsFilterOpen(false)}
        >
          <motion.div 
            className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Search Filter */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Search</h3>
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range (₹0 - ₹5000)</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">₹{filters.priceRange[0]}</span>
                    <span className="text-sm text-gray-600">₹{filters.priceRange[1]}</span>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="range"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(0, e.target.value)}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(1, e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Product Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          filters.tags.includes(tag)
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Reset all
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Show results
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Filter;
