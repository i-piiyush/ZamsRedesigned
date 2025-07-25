import { createContext, useContext, useState } from 'react';


const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
const [products, setProducts] = useState([
  {
    id: "prod_1a8f7",
    name: "Solo Leveling Hero Core Full Sleeve Tee",
    price: "Rs. 1,299.00",
    images: [
      "https://www.zamsfashion.in/cdn/shop/files/1_ca4f8083-12ba-4b43-b957-d8f34dc6beec.png?v=1740331850&width=1946",
      "https://www.zamsfashion.in/cdn/shop/files/3_4b1c1b8b-4d3e-49f9-aeff-657b860cc4f7.png?v=1740331850&width=990",
      "https://www.zamsfashion.in/cdn/shop/files/4_69126720-2699-424a-9416-eddda03bc1a0.png?v=1740331850&width=1946"
    ],
    description:
      "Unleash your inner hunter with this Solo Leveling full sleeve tee. Inspired by Sung Jin-Woo's rise, crafted for comfort and designed for fans who level up with style.",
    tags: ["Full-sleeve", "T-shirt"],
  },
  {
    id: "prod_2b7e3",
    name: "Tengen Uzui Sound Hashira Full Sleeve Oversized Tee – Demon Slayer",
    price: "Rs. 1,299.00",
    images: [
      "https://www.zamsfashion.in/cdn/shop/files/tengen-uzui-demon-slayer-oversized-full-sleeves-t-shirt-zams-2-452270.jpg?v=1720537024&width=990",
      "https://www.zamsfashion.in/cdn/shop/files/tengen-uzui-demon-slayer-oversized-full-sleeves-t-shirt-zams-1-500119.jpg?v=1720537024&width=1946",
      "https://www.zamsfashion.in/cdn/shop/files/tengen-uzui-demon-slayer-oversized-full-sleeves-t-shirt-zams-3-244352.jpg?v=1720537024&width=1946"
    ],
    description:
      "Celebrate Tengen Uzui’s flamboyant flair in this premium oversized tee. With full sleeves and bold design, this drop is for true slayers of both demons and dull fashion.",
    tags: ["Oversized", "T-shirt"],
  },
  {
    id: "prod_3c2d1",
    name: "Tanjiro Kamado Water Breath Oversized T-Shirt – Demon Slayer",
    price: "Rs. 899.00",
    images: [
      "https://www.zamsfashion.in/cdn/shop/files/tanjiro-demon-slayer-oversized-t-shirt-zams-1.jpg?v=1720536797&width=990",
      "https://www.zamsfashion.in/cdn/shop/files/tanjiro-demon-slayer-oversized-t-shirt-zams-2.jpg?v=1720536803&width=1946",
      "https://www.zamsfashion.in/cdn/shop/files/tanjiro-demon-slayer-oversized-t-shirt-zams-4.jpg?v=1720536803&width=1946"
    ],
    description:
      "Inspired by Tanjiro's Water Breathing technique, this oversized tee combines soft fabric with intense detail. Perfect for everyday wear or anime events. A wardrobe essential for every Demon Slayer fan.",
    tags: ["Oversized", "T-shirt"],
  },
  {
    id: "prod_4de9a",
    name: "Denji Chainsaw Devil Oversized T-Shirt – Chainsaw Man",
    price: "Rs. 1,099.00",
    images: [
      "https://www.zamsfashion.in/cdn/shop/files/denji-chainsawman-oversized-t-shirt-zams-1-719555.jpg?v=1720534987&width=990",
      "https://www.zamsfashion.in/cdn/shop/files/denji-chainsawman-oversized-t-shirt-zams-3-408656.jpg?v=1720534987&width=1946",
      "https://www.zamsfashion.in/cdn/shop/files/denji-chainsawman-oversized-t-shirt-zams-2-121168.jpg?v=1720534987&width=1946"
    ],
    description:
      "Go feral with Denji in this Chainsaw Man oversized tee. Built with breathable fabric and chaotic energy, it's made for devils who dress to slay—literally and fashionably.",
    tags: ["Oversized", "T-shirt"],
  },
  {
    id: "prod_6ef47",
    name: "Itachi Uchiha Legacy Oversized Tee – Naruto",
    price: "Rs. 1399.00",
    images: [
      "https://www.zamsfashion.in/cdn/shop/files/IMG_0744p-min.jpg?v=1740083200&width=990",
      "https://www.zamsfashion.in/cdn/shop/files/Itachi_Uchiha.jpg?v=1740083201&width=990",
      "https://www.zamsfashion.in/cdn/shop/files/itachi-uchiha-oversized-t-shirt-zams-4-519898.jpg?v=1740039458&width=990"
    ],
    description:
      "Honor the legend of the Hidden Leaf’s silent protector. This oversized tee blends minimalist design with Itachi’s enduring presence—made for shinobi who walk their own path.",
    tags: ["Oversized", "T-Shirt"],
  },
  {
    id: "prod_7gh21",
    name: "Ken Kaneki / Oversized Hoodie",
    price: "Rs. 1,799.00",
    images: [
      "https://www.zamsfashion.in/cdn/shop/files/ken-kaneki-oversized-hoodie-zams-1.jpg?v=1720537882&width=990",
      "https://www.zamsfashion.in/cdn/shop/files/ken-kaneki-oversized-hoodie-zams-2.jpg?v=1720537882&width=990",
      "https://www.zamsfashion.in/cdn/shop/files/ken-kaneki-oversized-hoodie-zams-4.jpg?v=1720537882&width=990"
    ],
    description:
      "Channel the duality of Kaneki with this Tokyo Ghoul-inspired oversized hoodie. Shadowy, bold, and stitched for the outcasts who embrace their power in silence.",
    tags: ["Hoodie"],
  }
]);



  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};


export const useProductContext = () => useContext(ProductContext);
