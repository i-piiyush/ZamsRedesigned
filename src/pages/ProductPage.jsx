import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ActionMenu from "../components/ActionMenu";
import Filter from "../components/Filter";
import Magnet from "../components/Magnet";
import Navbar from "../components/Navbar";
import { useFilterContext } from "../context/FilterContext";
import { useProductContext } from "../context/ProductContext";
import Loader from "../components/Loader";
import { useState } from "react";
import PageTransitions from "../components/PageTransitions";

const ProductPage = () => {
  const { setIsFilterOpen, filters } = useFilterContext();
  const { products } = useProductContext();
  const navigate = useNavigate();

  function handleLongWords(str, needed_words) {
    if (!str || typeof str !== "string") return "...";
    const words = str.trim().split(/\s+/);
    if (words.length <= needed_words) return str;
    return words.slice(0, needed_words).join(" ") + "...";
  }

  // Capitalize helper for consistency with filters
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // Apply filters to products
  const filteredProducts = products.filter((product) => {
    const normalizedProductTags = product.tags.map(capitalize);
    const activeTags = filters.tags;

    const matchesTags =
      activeTags.length === 0 ||
      activeTags.some((tag) => normalizedProductTags.includes(tag));

    const matchesSearch =
      !filters.searchQuery ||
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

    const numericPrice = parseFloat(
      product.price.replace(/Rs\.?/i, "").replace(/[₹,]/g, "").trim()
    );

    const matchesPrice =
      numericPrice >= filters.priceRange[0] &&
      numericPrice <= filters.priceRange[1];

    return matchesTags && matchesSearch && matchesPrice;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (

    <>
    <PageTransitions text={"Products"} animateBy={"letters"} delay={100} />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-primary min-h-screen w-full overflow-x-hidden relative"
    >
      {/* Top Navbar */}
      <nav className="w-full px-3 h-16 flex justify-center sm:justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-3 text-sm md:text-base bg-black text-white rounded-full"
          onClick={() => {
            setIsFilterOpen(true);
          }}
        >
          Filters
        </motion.button>
        <span className="hidden sm:block">
          <Magnet magnetStrength={9}>
            <ActionMenu />
          </Magnet>
        </span>
      </nav>

      {/* Filter Panel */}
      <Filter />

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full md:px-32 px-10 py-16 flex gap-3 flex-wrap "
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white h-[35rem] w-[20rem] flex flex-col items-center py-1 relative cursor-pointer"
               onClick={() => {
                  navigate(`/products/${product.id}`);
                }}
              
            >
              <div className="bg-zinc-300 h-[70%] w-[95%]">
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  src={product.images[0]}
                  alt="product_image"
                  className="h-full object-cover img-filter w-full"
                />
              </div>
              <div className="w-[95%] mt-2">
                <h1 className="font-bold">
                  {handleLongWords(product.name, 4)}
                </h1>
                <p className="opacity-60 text-sm font-light mb-3">
                  {product.price}
                </p>
                <p className="text-sm leading-[1.3] opacity-60 italic w-full font-light">
                  {handleLongWords(product.description, 10)}
                </p>
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-[95%] bg-black text-white mt-3 py-2 cursor-pointer absolute bottom-2"
                onClick={() => {
                  navigate(`/products/${product.id}`);
                }}
              >
                Buy now
              </motion.button>
              <div className="absolute top-2 w-[95%] left-2 flex gap-1 flex-wrap">
                {product.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-black/10 text-white px-4 py-1 text-sm backdrop-blur-md rounded-full"
                  >
                    {capitalize(tag)}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-black text-5xl font-semibold mt-20"
          >
            No products match your filters.
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Navbar */}
      <div className="w-full h-16 fixed bottom-3 flex justify-center z-50">
        <Navbar />
      </div>
    </motion.div>
    </>
    
  );
};

export default ProductPage;