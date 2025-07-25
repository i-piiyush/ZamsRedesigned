import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnet from "../components/Magnet";
import Navbar from "../components/Navbar";
import ActionMenu from "../components/ActionMenu";
import PageTransitions from "../components/PageTransitions";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const imgRef = useRef(null);
  const foundersRef = useRef([]);
  const paragraphRef = useRef(null);
  const storyRef = useRef(null);
  const storyBoxRef = useRef(null);

  useEffect(() => {
    // Heading: fade in and scale
    gsap.from(headingRef.current, {
      opacity: 0,
      scale: 0.94,
      y: 40,
      ease: "power3.out",
      duration: 1.2,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
    });

    // Paragraph: slide up and fade in
    gsap.from(paragraphRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: paragraphRef.current,
        start: "top 85%",
      },
    });

    // Founders group heading: fade in
    if (foundersRef.current[0]) {
      gsap.from(foundersRef.current[0], {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: foundersRef.current[0],
          start: "top 85%",
        },
      });
    }

    // Founder bios: fade in stagger
    foundersRef.current.slice(1).forEach((el, idx) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.15 * idx,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      });
    });

    // Parallax Image: moves slightly upward as you scroll
    gsap.to(imgRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 80%",
        end: "bottom 30%",
        scrub: true,
      },
    });

    // Story section: fade in from left
    gsap.from(storyRef.current, {
      opacity: 0,
      x: -60,
      duration: 1,
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 85%",
      },
    });

    // Story box: gentle zoom in
    gsap.from(storyBoxRef.current, {
      opacity: 0,
      scale: 0.97,
      duration: 1,
      delay: 0.2,
      scrollTrigger: {
        trigger: storyBoxRef.current,
        start: "top 90%",
      },
    });
  }, []);

  const founders = [
    {
      name: "Ethan Reves",
      role: "Co-Founder & Creative Director",
      bio: "Born in Los Angeles and raised on 90s anime classics, Ethan’s vision for Zams Fashion started with a sketchpad and a love for bold storytelling. With a background in streetwear design, he brings raw energy and cinematic aesthetics to every drop.",
    },
    {
      name: "Lena Weiss",
      role: "Co-Founder & Brand Strategist",
      bio: "Born in Berlin and raised around anime culture, Lena’s vision for Zams Fashion combines global perspective with fan-first fashion. With a background in brand strategy, she ensures Zams stays authentic, bold, and emotionally connected to every drop.",
    },
  ];

  return (

    <>
    <PageTransitions text={"About Us"} delay={100} animateBy={"words"} />
    <div className="bg-primary w-full py-12 px-5 xl:px-22" ref={containerRef}>
       <div className="w-full h-12 fixed top-3 right-3 flex justify-end items-center px-8 z-50">
        <Magnet magnetStrength={9}>
          <ActionMenu />
        </Magnet>
      </div>
      <div className="w-full h-16 fixed bottom-3 flex justify-center z-50">
        <Navbar />
      </div>
      <h1
        ref={headingRef}
        className="font-bold text-5xl md:text-8xl tracking-tighter text-center md:text-left"
      >
        Who are we?
      </h1>

      <p
        ref={paragraphRef}
        className="text-center md:text-left md:text-base 2xl:text-lg md:w-[70%] 2xl:w-[40%] leading-[1] font-light text-sm mt-5"
      >
        At Zams Fashion, anime isn't just something we watch — it's a lifestyle
        we wear. We blend bold designs, iconic characters, and street-ready
        style to bring your favorite stories to life. Whether you're repping
        your favorite clan or just vibing with the culture, Zams is for the fans
        who live and breathe anime.{" "}
        <span className="font-bold">Wear the story. Be the main character.</span>
      </p>

      <div className="w-full h-[60vh] mt-10 flex flex-col md:flex-row justify-start items-center gap-5">
        <div className="w-[40%] flex flex-col">
          <h1
            ref={(el) => (foundersRef.current[0] = el)}
            className="text-4xl xl:text-7xl font-bold my-3 text-center md:text-left tracking-tighter leading-[1]"
          >
            Meet the founders
          </h1>

          {founders.map((founder, index) => (
            <div
              key={index}
              ref={(el) => (foundersRef.current[index + 1] = el)}
              className="md:flex flex-col w-full hidden"
            >
              <h1 className="text-3xl tracking-tighter font-bold text-left">
                {founder.name}
              </h1>
              <div className="w-full">
                <button className="bg-black w-72 text-white italic font-light text-sm px-10 my-3 py-1 border-none">
                  {founder.role}
                </button>
              </div>
              <p className="text-sm font-light leading-[1] text-left max-w-xl">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
        <div className="2xl:justify-center flex w-[60%]">
          <div className="w-92 flex overflow-y-hidden border-none">
            <img
              ref={imgRef}
              src="https://i.pinimg.com/1200x/f8/ba/3d/f8ba3ddf97d6136323359f5e429638a4.jpg"
              alt=""
              className="w-full h-auto object-cover border-none"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-10 md:hidden">
        {founders.map((founder, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-full"
            ref={(el) => (foundersRef.current[index + 3] = el)} // avoid clashing with desktop refs
          >
            <h1 className="text-3xl tracking-tighter font-bold text-center">
              {founder.name}
            </h1>
            <div className="flex justify-center w-full">
              <button className="bg-black w-72 text-white italic font-light text-sm px-10 my-3 py-1 border-none">
                {founder.role}
              </button>
            </div>
            <p className="text-sm font-light leading-[1] text-center max-w-xl">
              {founder.bio}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10" ref={storyRef}>
        <h1 className="text-center md:text-left text-5xl tracking-tighter font-bold">
          Our Story
        </h1>
        <div
          ref={storyBoxRef}
          className="w-[95%] md:w-[75%] 2xl:w-[40rem] p-4 text-sm font-light text-white bg-black mt-5 shadow-md border-none"
        >
          <p className="text-center md:text-left">
            Zams Fashion was born from late-night anime binges, sketchpads full
            of ideas, and a shared dream between two friends from opposite sides
            of the world — Ethan from Los Angeles and Lena from Berlin. What
            started as a passion for anime turned into a mission to create
            something more: a brand where fans could wear their love for the
            stories that shaped them. Zams isn't just merch — it's a movement
            that blends anime, streetwear, and self-expression.
          </p>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default AboutUs;
