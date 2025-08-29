import { Header } from "@/components/Header";
import { HeroSectionParent } from "@/components/HeroSectionParent";

const Parents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSectionParent />
      </main>
    </div>
  );
};

export default Parents;
