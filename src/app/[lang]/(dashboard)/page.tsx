import Main from "@/components/home/Main";
import News from "@/components/home/News";
import FlexibleLayout from "@/components/ui/customs/flexible-layout";

export default function HomePage() {
  return (
    <FlexibleLayout
      fixedContent={
        <News />
      }
      fixedClassName="bg-white bg-opacity-5 px-4 py-2 w-[350px] hidden lg:block"
    >
      <Main />
    </FlexibleLayout>
  );
}
