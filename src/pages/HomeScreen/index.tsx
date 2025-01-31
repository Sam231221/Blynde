import { useEffect, useState } from "react";

import PageContainer from "../../components/PageContainer";
import Testimonials from "./components/Testimonials";

import DiscountOffers from "./components/DiscountOffers";
import { ImageSlider } from "./components/ImageSlider";
import HomeBanner from "./components/HomeBanner";
import imageData from "../../data/ImageData";
import RecentProductsContainer from "./components/RecentProductsContainer";
const HomeScreen = () => {
  const [slides, setSLides] = useState([]);
  useEffect(() => {
    setSLides(imageData);
  }, []);

  return (
    <PageContainer>
      <ImageSlider slides={slides} autoplay={true} />
      <HomeBanner />
      <RecentProductsContainer />
      {/* <DiscountOffers /> 
      <Testimonials /> */}
    </PageContainer>
  );
};
export default HomeScreen;
