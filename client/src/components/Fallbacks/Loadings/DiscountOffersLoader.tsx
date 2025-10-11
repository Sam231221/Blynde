import ContentLoader from "react-content-loader";

const DiscountOffersLoader = () => {
  return (
    <div
      className="flex items-center mb-10 mt-4 gap-5 overflow-x-auto has-scrollbar"
      style={{ overscrollBehaviorInline: "contain", scrollSnapType: "inline" }}
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="min-w-full p-8 border border-gray-200 rounded-sm"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <div className="max-w-[900px] w-[800px] h-[400px]">
              <ContentLoader
                speed={2}
                width={800}
                height={400}
                viewBox="0 0 800 400"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="10" ry="10" width="800" height="400" />
              </ContentLoader>
            </div>

            <div className="max-h-[400px] w-full">
              <ContentLoader
                speed={2}
                width={400}
                height={200}
                viewBox="0 0 400 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="4" ry="4" width="300" height="30" />
                <rect x="0" y="40" rx="4" ry="4" width="350" height="20" />
                <rect x="0" y="70" rx="4" ry="4" width="100" height="25" />
                <rect x="120" y="70" rx="4" ry="4" width="80" height="25" />
                <rect x="0" y="110" rx="4" ry="4" width="150" height="40" />
                <rect x="0" y="160" rx="4" ry="4" width="100" height="20" />
              </ContentLoader>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscountOffersLoader;
