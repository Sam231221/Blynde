import ContentLoader from "react-content-loader";
import { useProductFilters } from "../../../redux/reducers/FilterProductSlice";

const GridItemLoader = () => (
  <div className="relative h-[200px] sm:h-[300px]">
    <ContentLoader
      speed={2}
      className="w-full h-full"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" />
    </ContentLoader>
    <div className="px-3 py-1">
      <ContentLoader
        speed={2}
        width={340}
        height={84}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="2" y="-1" rx="3" ry="3" width="120" height="15" />
        <rect x="2" y="21" rx="3" ry="4" width="160" height="15" />
        <rect x="2" y="42" rx="3" ry="4" width="55" height="15" />
        <rect x="70" y="41" rx="3" ry="4" width="55" height="15" />
      </ContentLoader>
    </div>
  </div>
);

const ListItemLoader = () => (
  <div className="group flex flex-col sm:flex-row gap-2 mb-3 border border-gray-200 overflow-hidden transition-all duration-200 ease-in">
    <div className="w-[100px] sm:w-[150px] md:w-[200px] h-[100px] sm:h-[150px] md:h-[200px]">
      <ContentLoader
        speed={2}
        className="w-full h-full"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="2" ry="10" width="100%" height="100%" />
      </ContentLoader>
    </div>
    <div className="flex-1 px-2 py-2 md:px-10 md:py-10">
      <ContentLoader
        speed={2}
        viewBox="0 0 600 305"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="24" y="22" rx="5" ry="5" width="286" height="31" />
        <rect x="24" y="74" rx="5" ry="5" width="161" height="10" />
        <rect x="24" y="97" rx="5" ry="5" width="60" height="16" />
        <rect x="23" y="124" rx="100" ry="100" width="23" height="23" />
        <rect x="27" y="156" rx="5" ry="5" width="60" height="16" />
        <rect x="29" y="190" rx="5" ry="5" width="41" height="29" />
        <rect x="84" y="190" rx="5" ry="5" width="41" height="29" />
        <rect x="142" y="189" rx="5" ry="5" width="41" height="29" />
        <rect x="202" y="189" rx="5" ry="5" width="41" height="29" />
      </ContentLoader>
    </div>
  </div>
);

export const GalleryLoading = ({ count }: { count: number }) => {
  const { productsDisplayType } = useProductFilters();

  return (
    <div className="my-2">
      {productsDisplayType === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: count }, (_, i) => (
            <GridItemLoader key={i} />
          ))}
        </div>
      )}
      {productsDisplayType === "list" && (
        <>
          {Array.from({ length: count }, (_, i) => (
            <ListItemLoader key={i} />
          ))}
        </>
      )}
    </div>
  );
};
