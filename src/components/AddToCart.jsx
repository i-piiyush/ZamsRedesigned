import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartContext } from '../context/CartContext';

const AddToCart = () => {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen } = useCartContext();

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceStr = item.price.replace('Rs. ', '').replace(',', '');
    const price = parseFloat(priceStr);
    return sum + (isNaN(price) ? 0 : price * (item.quantity || 1));
  }, 0);

  const formatPrice = (price) => {
    return '₹' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 24 , duration:0.1}}
          className="fixed top-0 left-0 w-full h-full bg-black/10 flex justify-center items-center z-50"
        >
          <div className="w-[350px] bg-white  shadow-2xl overflow-hidden border border-gray-100 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 py-5">
              {[...Array(3)].map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full bg-gray-300 ${idx === 0 ? 'bg-gray-300' : ''}`}
                />
              ))}
            </div>

            {/* Cart Title */}
            <div className="text-center font-semibold text-xl mb-3">
              CART
            </div>

            {/* Cart Items */}
            <div className="px-5 pb-2 max-h-[320px] overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="py-10 text-gray-500 text-center">Your cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 mb-5">
                    {/* Product Image, peach bg */}
                    <div className="w-[70px] h-[70px]  flex-shrink-0 bg-[#ffffff] flex items-center justify-center overflow-hidden">
                      {item.images?.[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="object-cover w-full"
                        />
                      )}
                    </div>
                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          
                        </div>
                      
                      </div>
                      {/* Quantity info */}
                      <div className="flex justify-end mt-1 text-sm text-gray-600">
                        Quantity: {item.quantity || 1}
                      </div>
                    </div>
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 text-xl font-bold"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Total & Button */}
            {cartItems.length > 0 && (
              <div className="mt-5 px-5">
                <div className="flex justify-between items-center text-gray-500 text-lg mb-5">
                  <span>Total</span>
                  <span className="font-bold text-gray-800">{formatPrice(totalPrice)}</span>
                </div>
                {/* Bottom Address Button */}
                <div className="pb-5">
                  <button className="w-full py-3 bg-black text-white font-bold text-lg  flex items-center justify-center gap-2 transition hover:brightness-95">
                    Checkout <span className="ml-1 font-semibold">&rarr;</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCart;
