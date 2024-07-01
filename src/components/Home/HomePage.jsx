import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jpg";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="iPhone 14 Pro, and Beyond"
        subtitle="Experience the power of the latest iPhone 14 with our most Pro camera ever."
        link="/product/667e001e972819bd90dc21ee"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Set Ultimate Equipment"
        subtitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini."
        link="/product/667e001e972819bd90dc21fa"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
