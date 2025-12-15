import { HomeBanner } from "../organisms/home/homeBanner";
import { Tendencies } from "../organisms/home/homeTendencies";
import { MyTemplate } from "../templates/myTemplate";
import { Line } from "../molecules/home/homeLine";
import { Reviews } from "../organisms/home/SectionReviews";
import { VenefitsCoffee } from "../organisms/home/homeVenefitsCoffee";

function HomePage() {
  return (
    <MyTemplate 
    >
      <HomeBanner />
      <VenefitsCoffee />
      <Tendencies />
      <Line/>
      <Reviews/>
    </MyTemplate>
  );
}

export { HomePage };
