import { Header } from "@/components/Header";
import { HeroSectionLaunchlist } from "@/components/HeroSectionLaunchlist";

const Launchlist = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSectionLaunchlist />
      </main>
    </div>
  );
};

export default Launchlist;