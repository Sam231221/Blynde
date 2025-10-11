import React, { Children, useEffect, useState, useRef } from "react";

const widthSpan = 100.1;
interface ProductSliderProps {
  children: React.ReactNode;
  infinite?: boolean;
  timer?: number;
  stopOnManual?: boolean;
}
function ProductSlider(props: ProductSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const displayItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [touchStartPosition, setTouchStartPosition] = useState(0);
  const [touchEndPosition, setTouchEndPosition] = useState(0);
  const [touched, setTouched] = useState(false);
  const [swiped, setSwiped] = useState(false);
  const [mouseStartPosition, setMouseStartPosition] = useState(0);
  const [mouseEndPosition, setMouseEndPosition] = useState(0);
  const [mouseClicked, setMouseClicked] = useState(false);
  const [mouseSwiped, setMouseSwiped] = useState(false);

  const { children, infinite, timer, stopOnManual } = props;
  const childrenArray = React.Children.toArray(children);

  const [autoAdvance, setAutoAdvance] = useState(timer !== undefined);
  const intervalRef = useRef<number | null>(null);

  const prevSlideHandler = () => {
    let newPosition = sliderPosition;
    if (newPosition > 0) {
      newPosition = newPosition - 1;
    } else if (infinite || newPosition === 0) {
      // ensure that children is treated as an array of React nodes by using React.Children.toArray.
      newPosition = childrenArray.length - 1 || 0;
    }
    translateFullSlides(newPosition);
    setSliderPosition(newPosition);
  };

  const nextSlideHandler = () => {
    let newPosition = sliderPosition;
    if (newPosition < childrenArray.length - 1) {
      newPosition = newPosition + 1;
    } else if (infinite || newPosition === childrenArray.length - 1) {
      newPosition = 0;
    }
    translateFullSlides(newPosition);
    setSliderPosition(newPosition);
  };

  const jumpToSlideHandler = (id: number) => {
    translateFullSlides(id);
    setSliderPosition(id);
  };

  const manageTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (stopOnManual) {
      setAutoAdvance(false);
    }
  };

  const prevClickHandler = () => {
    manageTimer();
    prevSlideHandler();
  };

  const nextClickHandler = () => {
    manageTimer();
    nextSlideHandler();
  };

  const keyPressHandler = (event: KeyboardEvent) => {
    manageTimer();
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();
      prevSlideHandler();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      nextSlideHandler();
      return;
    }
    if (49 <= event.keyCode && event.keyCode <= 57) {
      const arrayPos = event.keyCode - 49;
      if (arrayPos < childrenArray.length) {
        jumpToSlideHandler(arrayPos);
      }
      return;
    }
    if (event.keyCode === 48) {
      if (childrenArray.length >= 10) jumpToSlideHandler(9);
    }
  };

  const speedUpAnimation = () => {
    for (
      let i = Math.max(0, sliderPosition - 2);
      i < (Math.min(childrenArray.length, sliderPosition + 3) || 1);
      i++
    ) {
      const elem = displayItemsRef.current[i];
      //add fast transition
      elem?.classList.add("transition-all duration-100 linear");
    }
  };

  const slowDownAnimation = () => {
    for (
      let i = Math.max(0, sliderPosition - 2);
      i < (Math.min(childrenArray.length, sliderPosition + 3) || 1);
      i++
    ) {
      const elem = displayItemsRef.current[i];
      elem?.classList.remove("transition-all duration-100 linear");
    }
  };

  const touchStartHandler = (e: React.TouchEvent) => {
    manageTimer();
    speedUpAnimation();
    setTouchStartPosition(e.targetTouches[0].clientX);
    setTouchEndPosition(e.targetTouches[0].clientX);
    setTouched(true);
  };

  const touchMoveHandler = (e: React.TouchEvent) => {
    setTouchEndPosition(e.targetTouches[0].clientX);
    const frameWidth = sliderRef.current?.offsetWidth || 1;
    const translateDist =
      ((touchEndPosition - touchStartPosition) / frameWidth) * 100;
    translatePartialSlides(translateDist);
    if (touched === true) {
      setSwiped(true);
    }
  };

  const touchEndHandler = () => {
    if (swiped) {
      slowDownAnimation();
      if (touchStartPosition - touchEndPosition > 75) {
        nextSlideHandler();
      } else if (touchStartPosition - touchEndPosition < -75) {
        prevSlideHandler();
      } else {
        jumpToSlideHandler(sliderPosition);
      }
    }
    setTouched(false);
    setSwiped(false);
  };

  const mouseStartHandler = (e: React.MouseEvent) => {
    manageTimer();
    e.preventDefault();
    speedUpAnimation();
    setMouseStartPosition(e.clientX);
    setMouseEndPosition(e.clientX);
    setMouseClicked(true);
  };

  const mouseMoveHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const frameWidth = sliderRef.current ? sliderRef.current.offsetWidth : 1;
    if (mouseClicked === true) {
      setMouseEndPosition(e.clientX);
      const translateDist =
        ((mouseEndPosition - mouseStartPosition) / frameWidth) * 100;
      translatePartialSlides(translateDist);
      setMouseSwiped(true);
    }
  };

  const mouseEndHandler = () => {
    slowDownAnimation();
    if (mouseSwiped === true) {
      if (mouseStartPosition - mouseEndPosition > 100) {
        nextSlideHandler();
      } else if (mouseStartPosition - mouseEndPosition < -100) {
        prevSlideHandler();
      } else {
        jumpToSlideHandler(sliderPosition);
      }
    }
    setMouseClicked(false);
    setMouseSwiped(false);
  };

  const wheelHandler = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  };

  const translatePartialSlides = (toTranslate: number) => {
    const currentTranslation = -sliderPosition * widthSpan;
    const totalTranslation = currentTranslation + toTranslate;
    for (let i = 0; i < (childrenArray.length || 1); i++) {
      const elem = indicatorsRef.current[i];
      const displayItem = displayItemsRef.current[i];
      if (elem && displayItem) {
        displayItem.style.transform = `translateX(` + totalTranslation + `%)`;
      }
    }
  };

  const translateFullSlides = (newPosition: number) => {
    const toTranslate = -widthSpan * newPosition;
    for (let i = 0; i < (childrenArray.length || 1); i++) {
      const elem = indicatorsRef.current[i];
      const displayItem = displayItemsRef.current[i];
      if (elem && displayItem) {
        displayItem.style.transform = `translateX(` + toTranslate + `%)`;
      }
    }
  };

  const displayItems = Children.map(children, (child, index) => (
    <div
      ref={(el) => {
        displayItemsRef.current[index] = el;
      }}
      className="touch-none w-full h-full inline-block align-top mr-[0.1%] transition-all duration-500 ease-out"
      id={`carouselitem` + index}
    >
      {child}
    </div>
  ));

  const positionIndicators = Children.map(children, (child, index) => (
    <div
      ref={(el) => {
        indicatorsRef.current[index] = el;
      }}
      id={`positionIndicator` + index}
      className={
        sliderPosition === index
          ? "w-[150px] h-[150px] box-border mb-1 border border-[#e6e6e6]".concat(
              " " + "border-[4px] border-[#0080ff]"
            )
          : "w-[150px] h-[150px] box-border mb-1 border border-[#e6e6e6]"
      }
      onClick={() => jumpToSlideHandler(index)}
    >
      {child}
    </div>
  ));

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    if (autoAdvance && !mouseClicked && !touched) {
      intervalRef.current = setInterval(() => {
        nextSlideHandler();
      }, timer);
    }
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  });

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      <div className="flex md:flex-col gap-2 z-[10] ">{positionIndicators}</div>
      <div
        id="container"
        className="relative flex w-full h-screen align-middle items-center overflow-hidden"
      >
        {childrenArray.length > 1 && (
          <div
            id="left-arrow"
            className="absolute left-[1%] px-[2px] text-lg text-[#aabbcc] hover:text-[#bbccdd] select-none z-[2]"
            onClick={prevClickHandler}
          >
            ❰
          </div>
        )}

        <div
          ref={sliderRef}
          className="w-full h-full touch-none m-auto text-center caret-transparent z-[1] whitespace-nowrap"
          id="DisplayFrame"
          onTouchStart={(e) => touchStartHandler(e)}
          onTouchMove={(e) => touchMoveHandler(e)}
          onTouchEnd={touchEndHandler}
          onMouseDown={(e) => mouseStartHandler(e)}
          onMouseMove={(e) => mouseMoveHandler(e)}
          onMouseUp={mouseEndHandler}
          onMouseLeave={mouseEndHandler}
          onWheel={() => wheelHandler()}
        >
          {displayItems}
        </div>
        {childrenArray.length > 1 && (
          <div
            id="right-arrow"
            className="absolute right-[1%] px-[2px] text-lg text-[#aabbcc] hover:text-[#bbccdd] select-none z-[2]"
            onClick={nextClickHandler}
          >
            ❱
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductSlider;
