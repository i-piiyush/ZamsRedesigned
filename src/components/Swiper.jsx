import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

// Customize as needed
const imageHeights = [300, 450, 350, 500, 400];

const ProductSwiper = () => {
  const { products } = useProductContext();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
 const navigate = useNavigate()
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null); // <-- Added for mobile/desktop overlay
  const autoplayInterval = useRef(null);

  // Swiper navigation
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    autoplayInterval.current = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(autoplayInterval.current);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // --- Card overlay state handlers ---
  const handleCardEnter = (idx) => setActiveIdx(idx); // show overlay on hover
  const handleCardLeave = () => setActiveIdx(null);   // hide overlay when hover ends

  // For mobile/touch: tap toggles overlay
  const handleCardTouch = (idx) => {
    // Prevent the default touch behavior to avoid double activation!
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <div className="w-full py-10 bg-primary flex items-center justify-center">
      <div className="w-[90%] max-w-[1300px] mx-auto">
        {/* Navigation Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="bg-white p-2  disabled:opacity-50"
            style={{ borderRadius: 0 }}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="bg-white p-2 disabled:opacity-50"
            style={{ borderRadius: 0 }}
          >
            <ChevronRight />
          </button>
        </div>
        {/* Swiper Track */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-end">
            {products.map((product, idx) => (
              <div
                key={idx}
                className={`
                  px-2
                  flex-[0_0_100%]
                  sm:flex-[0_0_33.3333%]
                  md:flex-[0_0_50%]
                  lg:flex-[0_0_22.2222%]
                `}
                style={{ borderRadius: 0 }}
              >
                {/* Card Wrapper for Hover/Touch - no group class */}
                <div
                  className="relative overflow-hidden cursor-pointer select-none"
                  onMouseEnter={() => handleCardEnter(idx)}
                  onMouseLeave={handleCardLeave}
                  onTouchStart={(e) => {
                    e.stopPropagation(); // For event bubbling on mobile
                    handleCardTouch(idx);
                  }}
                >
                  {/* Product Image */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={`
                      w-full object-cover block transition-transform duration-300
                      ${activeIdx === idx ? "-translate-y-24" : "" } img-filter
                    `}
                    style={{
                      borderRadius: 0,
                      width: "100%",
                      height: imageHeights[idx % imageHeights.length] + "px",
                      objectFit: "cover",
                    }}
                  />
                  {/* Bottom Card */}
                  <div
                    className={`
                      absolute left-0 right-0 bottom-0
                      bg-white p-4
                      transition-transform duration-300
                      ${activeIdx === idx ? "translate-y-0" : "translate-y-full"}
                    `}
                  >
                    <div className="text-sm font-semibold">{product.name}</div>
                    <div className="text-gray-500 text-sm italic py-2">{product.price}</div>
                    <button 
                      className="mt-2 w-full bg-black text-white py-2 transition-colors duration-150 hover:bg-gray-800 cursor-pointer"
                      onClick={()=>{
                        navigate(`/products/${product.id}`)
                      }} 
                    >
                      buy now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSwiper;
