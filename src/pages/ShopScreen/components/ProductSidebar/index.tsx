import {
  Category,
  Colors,
  DoubleRangePriceSlider,
  FilterBySize,
} from "./components";

const ProductSidebar = () => {
  return (
    <div className="w-full hidden md:block md:w-1/4 lg:w-1/5">
      <div className="relative">
        <section className="w-full border-r-2 border-[#e5e5e5] z-[3] flex flex-col items-center overflow-y-auto">
          <Category />
          <DoubleRangePriceSlider />
          <FilterBySize />
          <Colors />
        </section>
      </div>
    </div>
  );
};

export default ProductSidebar;
