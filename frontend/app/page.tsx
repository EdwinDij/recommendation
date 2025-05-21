import {
  FeatureSection,
  Footer,
  HeroSection,
  Navbar,
  PricingSection,
} from "./components/Landing";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <PricingSection />
      <Footer />
    </>
  );
}
