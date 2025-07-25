import Loader from "../components/Loader";


const Section1 = () => {
  return (
    <>
      <Loader />
      <div className="h-screen w-full relative overflow-x-hidden z-10">
        <div className="w-full px-5 py-20 md:px-10 flex flex-col justify-center md:justify-baseline items-center md:items-start gap-3">
          <h1 className="text-3xl font-extrabold leading-[1] text-center md:text-left md:text-[7vw] xl:text-[6rem]">
            FOR THE ONES WHO GET
            <br />
            THE REFERENCE.
          </h1>
          <p className="leading-[1] text-center md:text-left md:text-[1.5vw] xl:text-[1.5rem]">
            Because real ones don’t need context <br />— they feel it, wear it,
            and live the culture.
          </p>
        </div>
        <div
          className="bg-secondary w-[75%] h-52 xl:h-72 absolute top-[30%] xl:top-[40%] right-0"
          id="ani"
        ></div>
        <div className="absolute bottom-0 left-0 w-full h-[800px] md:h-[900px] 2xl:h-[1000px] overflow-hidden z-20">
          <img
            src="src/assets/OnePiece.png"
            alt="landing_image"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto h-[80%] object-cover img-filter md:left-[50%] md:-translate-x-0"
          />
        </div>
      </div>
    </>
  );
};

export default Section1;
