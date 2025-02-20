import ContentLoader from "react-content-loader";
import { RootState } from "../../../../../types";
import { useSelector } from "react-redux";

export const GalleryLoading = () => {
  const { productsDisplayType } = useSelector(
    (state: RootState) => state.productfilters
  );
  return (
    <div className="my-2">
      {productsDisplayType === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div key={item} className="relative h-[200px] sm:h-[300px]">
              <ContentLoader
                speed={2}
                className="w-full h-full"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="2" ry="2" width="400" height="400" />
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
          ))}
        </div>
      )}
      {productsDisplayType === "list" && (
        <>
          {[0, 1, 2, 3, 4].map((item) => (
            <div key={item}>
              <div className="group flex flex-col sm:flex-row  gap-2 mb-3 border border-gray-200 overflow-hidden transition-all duration-200 ease-in">
                <div className="container">
                  <ContentLoader
                    speed={2}
                    className="w-full h-full"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect
                      x="0"
                      y="0"
                      rx="2"
                      ry="10"
                      width="100%"
                      height="100%"
                    />
                  </ContentLoader>
                </div>
                <div className="container sm:px-2 sm:py-2 md:px-10 md:py-10">
                  <ContentLoader
                    speed={2}
                    className="w-full h-full"
                    viewBox="0 0 600 305"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="24" y="22" rx="5" ry="5" width="286" height="31" />
                    <rect x="24" y="74" rx="5" ry="5" width="161" height="10" />
                    <rect x="24" y="97" rx="5" ry="5" width="60" height="16" />
                    <rect
                      x="23"
                      y="124"
                      rx="100"
                      ry="100"
                      width="23"
                      height="23"
                    />
                    <rect x="27" y="156" rx="5" ry="5" width="60" height="16" />
                    <rect x="29" y="190" rx="5" ry="5" width="41" height="29" />
                    <rect x="84" y="190" rx="5" ry="5" width="41" height="29" />
                    <rect
                      x="142"
                      y="189"
                      rx="5"
                      ry="5"
                      width="41"
                      height="29"
                    />
                    <rect
                      x="202"
                      y="189"
                      rx="5"
                      ry="5"
                      width="41"
                      height="29"
                    />
                    <rect
                      x="58"
                      y="124"
                      rx="100"
                      ry="100"
                      width="23"
                      height="23"
                    />
                    <rect
                      x="94"
                      y="124"
                      rx="100"
                      ry="100"
                      width="23"
                      height="23"
                    />
                    <rect
                      x="130"
                      y="125"
                      rx="100"
                      ry="100"
                      width="23"
                      height="23"
                    />
                    <rect x="26" y="231" rx="5" ry="5" width="41" height="17" />
                    <rect
                      x="28"
                      y="267"
                      rx="5"
                      ry="5"
                      width="108"
                      height="34"
                    />
                    <rect
                      x="166"
                      y="266"
                      rx="5"
                      ry="5"
                      width="272"
                      height="37"
                    />
                  </ContentLoader>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
