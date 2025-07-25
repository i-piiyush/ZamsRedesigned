import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import Magnet from "../components/Magnet";
import Navbar from "../components/Navbar";
import ActionMenu from "../components/ActionMenu";
import {
  IoIosArrowRoundBack,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import RatingBars from "../components/RatingBars";
import Review from "../components/Reveiw";
import ProductSwiper from "../components/Swiper";
import AddToCart from "../components/AddToCart";
import { useCartContext } from "../context/CartContext";

// --- SwiperEmbla Component ---
const SwiperEmbla = ({ images = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="embla w-full h-full bg-primary" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {images.map((src, i) => (
            <div
              className="embla__slide flex-shrink-0 w-full h-full flex items-center justify-center"
              key={i}
            >
              <img
                src={src}
                alt={`Product ${i + 1}`}
                className="object-contain w-full h-full max-h-[70vh] m-auto"
                style={{ borderRadius: 0 }}
              />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 transition shadow p-1 z-10"
            style={{ borderRadius: 0 }}
            aria-label="Previous image"
          >
            <IoIosArrowBack size={28} color="#333" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 transition shadow p-1 z-10"
            style={{ borderRadius: 0 }}
            aria-label="Next image"
          >
            <IoIosArrowForward size={28} color="#333" />
          </button>
        </>
      )}
    </div>
  );
};

// --- Main ProductDetails Component ---
const ProductDetails = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const sizes = ["S", "M", "L", "XL"];
  const { id } = useParams();
  const { products } = useProductContext();
  const { addToCart } = useCartContext();
  const product = products.find((p) => String(p.id) === String(id));
  const navigate = useNavigate();

  const handlePrevPage = () => {
    navigate(-1);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No product found.</p>
      </div>
    );
  }

  return (
    <div className="bg-primary w-full min-h-screen relative px-2 pb-20">
      {/* Top Menu */}
      <div className="w-full h-12 fixed top-3 right-2 flex justify-end items-center px-8 z-50">
        <Magnet magnetStrength={9}>
          <ActionMenu />
        </Magnet>
      </div>

      <div className="w-full h-full pt-24">
        {/* Back Button */}
        <span className="flex items-center gap-3 opacity-50">
          <IoIosArrowRoundBack
            size={"2rem"}
            className="cursor-pointer"
            onClick={handlePrevPage}
          />
          <p
            className="italic text-sm font-light cursor-pointer"
            onClick={handlePrevPage}
          >
            back to all products
          </p>
        </span>

        {/* Main Content Grid */}
        <div className="w-full flex flex-col md:flex-row h-auto mt-4">
          {/* Image Swiper */}
          <div className="w-full md:w-[50%] xl:w-[40%] bg-red-300 h-[40vh] md:h-[80vh] flex items-center justify-center p-0">
            <SwiperEmbla images={product.images} />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-[50%] xl:w-[60%] px-5 py-10">
            <h1 className="text-xl font-bold text-center md:text-left leading-[1]">
              {product.name}
            </h1>
            <p className="mt-4 font-semibold">{product.price}</p>
            <p className="text-sm opacity-40 -mt-1">Tax included</p>

            <br />
            <h1 className="text-sm opacity-50">Select Size</h1>
            <div className="w-full h-10 flex items-center gap-1">
              {sizes.map((size, index) => (
                <span
                  onClick={() => setSelectedIndex(index)}
                  key={index}
                  className={`${
                    selectedIndex === index
                      ? `bg-black text-white`
                      : `bg-white text-black`
                  } hover:bg-black hover:text-white cursor-pointer text-sm px-3 py-2 transition`}
                >
                  {size}
                </span>
              ))}
            </div>

            <button
              className="w-full md:w-[70%] py-3 text-sm font-semibold bg-black text-white mt-2 cursor-pointer"
              onClick={() => {
                addToCart(product);
              }}
            >
              Add to cart
            </button>

            <h1 className="text-4xl font-semibold text-center md:text-left mt-10">
              Description & Fit
            </h1>
            <p className="font-light italic opacity-50 text-center md:text-left leading-[1] mt-3">
              {product.description}
            </p>
          </div>
        </div>

        {/* --- Full-width Rating & Reviews Section --- */}
        <div className="w-full  mt-10 px-4 py-10">
          <h1 className="text-3xl xl:text-6xl font-semibold text-center">
            Rating & Reviews
          </h1>
          <div className="w-full flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 w-full flex flex-col md:flex-row ">
              <div className="flex items-end justify-center  mt-3">
                <h1 className="text-9xl font-bold">4.5</h1>
                <p className="text-3xl opacity-50">/5</p>
              </div>
              <div className="mt-3 flex justify-center md:justify-start px-5 items-center w-full ">
                <RatingBars />
              </div>
            </div>

            <div className="md:w-1/2 w-full mt-3">
              <Review />
            </div>
          </div>
        </div>

        <div className=" w-full ">
          <h1 className="text-3xl xl:text-6xl font-bold text-center leading-[1]">
            SOME RECOMENDATIONS FOR THE “G”
          </h1>

          <br />
          <ProductSwiper />
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="w-full h-16 fixed left-0 bottom-3 flex justify-center z-50">
        <Navbar />
      </div>
    </div>
  );
};

export default ProductDetails;
