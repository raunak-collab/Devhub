import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import PopularToolSection from "@/components/home/PopularToolSection";
import WhyDevHub from "@/components/home/WhyDevHub";
import Footer from "@/components/layout/Footer";
import Auth from "@/data/Auth";

export default function Home() {
  // Auth()

  return (
    <>
      <main>
        <Hero />
        <PopularToolSection />
        <Categories />
        <WhyDevHub />
        <Footer />
      </main>
    </>
  );
}
