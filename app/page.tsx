import HomeHeader from "@/components/home/header/HomeHeader";
import HomeMain from "@/components/home/main/HomeMain";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16">
      <HomeHeader />
      <HomeMain />
    </main>
  );
}
