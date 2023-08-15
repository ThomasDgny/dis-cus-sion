import HomeHeader from "@/components/home/header/HomeHeader";
import HomeMain from "@/components/home/main/HomeMain";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-16 pt-5">
      <HomeHeader />
      <HomeMain />
    </main>
  );
}
