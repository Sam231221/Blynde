import { useHighestPriorityDiscount } from "../../hooks/useOffers";
import Navbar from "./Navbar";
import SaleBanner from "./SaleBanner";

export default function Header() {
  const { data: discount } = useHighestPriorityDiscount();
  const isBannerVisible = Boolean(discount);

  return (
    <>
      <SaleBanner />
      <Navbar isBannerVisible={isBannerVisible} />
    </>
  );
}
