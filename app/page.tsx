import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ flex: 1 }}>
      <Header />
      <HeroBanner />
      <JoinSection />
      <Footer />
    </main>
  );
}
