import React,{useState} from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { motion } from "framer-motion";
import { useCartContext } from "../context/CartContext"

const Tooltip = ({ children, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <motion.div
          className="absolute -bottom-2 left-1/2 z-50 -translate-x-1/2 translate-y-full select-none
          whitespace-nowrap bg-neutral-900 text-neutral-100 rounded-lg px-3 py-1 text-sm shadow-lg"
          initial={{ scale: 0.85, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

const ActionMenu = () => {
  const { cartItems, setIsCartOpen, isCartOpen } = useCartContext();
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-white flex justify-center items-center gap-4 px-5 rounded-full drp py-3 relative z-10 md:scale-100 scale-90">
      {/* Search */}
      <Tooltip content="search">
        <span>
          <IoMdSearch size="1.2rem" className="cursor-pointer" />
        </span>
      </Tooltip>

      {/* Profile */}
      <Tooltip content="Profile">
        <span>
          <CgProfile size="1.2rem" className="cursor-pointer" />
        </span>
      </Tooltip>

      {/* Cart */}
      <Tooltip content="Cart">
        <span className="relative cursor-pointer" onClick={toggleCart}>
          <LuShoppingCart size="1.2rem" />
          {cartItems.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {cartItems.length}
            </motion.span>
          )}
        </span>
      </Tooltip>
    </div>
  );
};

export default ActionMenu;