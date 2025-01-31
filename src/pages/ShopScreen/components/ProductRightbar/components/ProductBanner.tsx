import banner4 from "/images/banners/banner-04.jpg";
export default function ProductBanner() {
  return (
    <>
      <div className="container">
        <img className="w-full h-full object-contain" src={banner4} alt="" />
      </div>

      <div className="absolute flex justify-start top-4 left-6 sm:top-16 sm:left-10">
        <div className="w-[66%] sm:w-[57%] p-2">
          <h2 className="xs:text-sm md:text-xl lg:text-4xl my-2 tracking-wider font-semibold">
            Plus Size-Styles for Every Season
          </h2>
          <div className="text-xs md:text-sm text-gray-600 tracking-wider">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
          </div>

          <a
            href="https://klbtheme.com/clotya/product/basic-colored-sweatpants-with-elastic-hems/?ft=recentfalse"
            className="hidden xs:flex gap-1 items-center font-medium my-2 sm:my-3 text-xs md:text-sm"
          >
            Shop Now
          </a>
        </div>
      </div>
    </>
  );
}
