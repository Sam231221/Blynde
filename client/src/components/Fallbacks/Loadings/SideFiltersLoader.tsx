import React from "react";
import ContentLoader from "react-content-loader";

interface SideFiltersLoaderProps {
  speed?: number;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  itemCount?: number;
  itemHeight?: number;
  itemSpacing?: number;
  itemWidth?: number;
  iconWidth?: number;
}

const SideFiltersLoader: React.FC<SideFiltersLoaderProps> = ({
  speed = 2,
  width = "100%",
  backgroundColor = "#f3f3f3",
  foregroundColor = "#ecebeb",
  itemCount = 3,
  itemHeight = 25,
  itemSpacing = 20,
  itemWidth = 130,
  iconWidth = 22,
  ...rest
}) => {
  const calculateHeight = () => {
    const totalItemHeight = itemCount * itemHeight;
    const totalSpacing = (itemCount - 1) * itemSpacing;
    return totalItemHeight + totalSpacing;
  };

  const generateRects = () => {
    const rects = [];
    for (let i = 0; i < itemCount; i++) {
      const y = i * (itemHeight + itemSpacing);
      rects.push(
        <React.Fragment key={i}>
          <rect
            x={iconWidth + 10}
            y={y + 2}
            rx="5"
            ry="5"
            width={itemWidth}
            height={itemHeight}
          />
          <rect
            x={8}
            y={y}
            rx="5"
            ry="5"
            width={iconWidth}
            height={itemHeight}
          />
        </React.Fragment>
      );
    }
    return rects;
  };

  return (
    <ContentLoader
      speed={speed}
      width={width}
      height={calculateHeight()}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      {...rest}
    >
      {generateRects()}
    </ContentLoader>
  );
};

export default SideFiltersLoader;
