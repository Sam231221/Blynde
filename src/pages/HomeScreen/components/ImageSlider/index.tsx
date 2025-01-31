import { useEffect, useState } from "react";

import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";

export const ImageSlider = ({ slides, autoplay = false, timeout = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };
  const previousSlide = () => {
    //reaches last slide
    if (current === slides.length - 1) {
      setCurrent(0);
    }
    //clicks previous btn on being slide 1(index 0)
    if (current <= 0) {
      setCurrent(slides.length - 1);
    } else {
      //somewhere between
      setCurrent(current - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, timeout);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <>
      {slides.map((slide, index) => (
        <div
          className={`relative container-xl overflow-hidden ${
            current === index ? "block" : "hidden"
          }`}
          key={index}
        >
          <div
            className="h-screen bg-cover bg-no-repeat bg-center flex items-center flex-wrap gap-4 px-4 pb-14"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="z-20 flex flex-col  tracking-wide px-4 py-8">
              <h3 className=" text-2xl text-zinc-700 font-medium">
                {slide.headline}
              </h3>
              <p className="text-5xl mt-1 uppercase text-zinc-800 font-bold">
                {slide.description}
              </p>
              <a
                href=""
                className="mt-5 py-2 text-center uppercase font-bold bg-blue-500 hover:bg-blue-400 w-40 text-white  rounded-full"
              >
                Shop Now
              </a>
            </div>
          </div>
          <button
            className="prev absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3  rounded-full"
            onClick={previousSlide}
          >
            <FaCaretLeft
              size={40}
              className="text-gray-400 hover:text-[##717FE0]"
              onClick={previousSlide}
            />
          </button>
          <button
            className="next absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3  rounded-full"
            onClick={nextSlide}
          >
            <FaCaretRight
              size={40}
              className="text-gray-400 hover:text-[##717FE0]"
              onClick={nextSlide}
            />
          </button>
        </div>
      ))}
    </>
  );
};
