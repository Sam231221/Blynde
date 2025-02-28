import { useEffect, useState } from "react";

import PageContainer from "../../components/PageContainer";
import Testimonials from "./components/Testimonials";
import DiscountOffers from "./components/DiscountOffers";
import ImageSlider from "./components/ImageSlider";
import HomeBanner from "./components/HomeBanner";
import RecentProductsContainer from "./components/RecentProductsContainer";
import { imageData, ImageDataProps } from "../../data/ImageData";

const HomeScreen = () => {
  const [slides, setSLides] = useState<ImageDataProps[]>([]);
  useEffect(() => {
    setSLides(imageData);
  }, []);
  return (
    <PageContainer>
      <ImageSlider slides={slides} />
      <HomeBanner />
      <RecentProductsContainer />
      <DiscountOffers />
      <Testimonials />
    </PageContainer>
  );
};
export default HomeScreen;
