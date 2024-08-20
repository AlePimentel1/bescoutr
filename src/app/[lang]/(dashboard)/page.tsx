import Main from "@/components/home/Main";
import News from "@/components/home/News";

export default function HomePage() {
  return (
    <div className="flex flex-row h-full">
      <Main />
      <News />
    </div>
  );
}
