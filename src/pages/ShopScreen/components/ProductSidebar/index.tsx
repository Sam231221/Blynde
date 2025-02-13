import {
  Category,
  Colors,
  DoubleRangePriceSlider,
  FilterBySize,
} from "./components";

interface ProductSidebarProps {
  handleCategoriesChange: (categories: string[]) => void;
  handlePriceChange: (min: number, max: number) => void;
  handleSizeChange: (size: string) => void;
  handleColorChange: (color: string) => void;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  handleCategoriesChange,
  handlePriceChange,
  handleSizeChange,
  handleColorChange,
}) => {
  return (
    <div className="w-full hidden md:block md:w-1/4 lg:w-1/5">
      <div className="relative">
        <section className="w-full border-r-2 border-[#e5e5e5] z-[3] flex flex-col items-center overflow-y-auto">
          <Category handleCategoriesChange={handleCategoriesChange} />
          {/* Range Slider */}
          <DoubleRangePriceSlider
            min={0}
            max={500}
            handlePriceChange={handlePriceChange}
          />
          {/* FilterBySize */}
          <FilterBySize handleSizeChange={handleSizeChange} />
          {/* Colors */}
          <Colors handleColorChange={handleColorChange} />
        </section>
      </div>
    </div>
  );
};

export default ProductSidebar;
