import React, { useRef, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const reviews = [
  {
    name: "Aarav Sharma",
    date: "19 Jan'25",
    image:
      "https://i.pinimg.com/1200x/af/78/69/af78696215b6475cdfa39f7ecdecd512.jpg",
    stars: 5,
    review:
      "Top-notch design and stitching. Quick delivery. Highly recommended anime hoodie.",
  },
  {
    name: "Priya Desai",
    date: "06 Feb'25",
    image:
      "https://i.pinimg.com/736x/9b/32/45/9b3245e4274b5d939f11fc37eccd508f.jpg",
    stars: 4,
    review:
      "Soft fabric, excellent print quality. Unique anime collection with great detail.",
  },
  {
    name: "Ananya Iyer",
    date: "25 Mar'25",
    image:
      "https://i.pinimg.com/736x/23/b1/11/23b111ab944813ccb6d6320ea353e18b.jpg",
    stars: 3,
    review:
      "Fun, comfortable anime tees. Quality holds well after many washes.",
  },
  {
    name: "Rohan Gupta",
    date: "13 Jul'25",
    image:
      "https://i.pinimg.com/736x/c0/ea/41/c0ea41b30035f4334d0c0c273f156156.jpg",
    stars: 2,
    review:
      "Nice look but slightly loose. Cool anime patterns and authentic designs.",
  },
  {
    name: "Sneha Patel",
    date: "20 Oct'25",
    image:
      "https://i.pinimg.com/1200x/95/19/03/951903a4de74285f1029a19a3b8274a3.jpg",
    stars: 5,
    review:
      "Loved the warm hoodie. Vibrant anime print and perfect for winter.",
  },
];

const Star = ({ filled }) => (
  <svg
    className={`w-3 h-3 mr-1 ${
      filled ? "opacity-100" : "opacity-30"
    } text-black`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2
      9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

const Review = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const timer = useRef(null);

  useEffect(() => {
    if (!emblaApi) return;
    const scroll = () => {
      emblaApi.scrollNext();
    };
    timer.current = setInterval(scroll, 3000);
    emblaApi.on("pointerDown", () => clearInterval(timer.current));
    emblaApi.on("pointerUp", () => {
      timer.current = setInterval(scroll, 3000);
    });
    return () => clearInterval(timer.current);
  }, [emblaApi]);

  return (
    <div className="w-full mx-auto my-10  p-8 ">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {reviews.map((r, i) => (
            <div key={i} className="flex-shrink-0 w-full px-2">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-5">
                  <span className="bg-red-300 h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full object-cover "
                    />
                  </span>

                  <div>
                    <div className="font-semibold  text-gray-800">{r.name}</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} filled={idx < r.stars} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-gray-700 text-sm font-medium">
                  {r.date}
                </div>
              </div>
              <blockquote className="italic text-sm leading-[1] text-gray-900/70 mt-8 ">
                {r.review}
              </blockquote>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
