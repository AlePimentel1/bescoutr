import FeedContent from "@/components/feed/Feed";
import News from "@/components/home/News";
import CustomTabs from "@/components/ui/customs/custom-tabs";
import FlexibleLayout from "@/components/ui/customs/flexible-layout";

export default function FeedPage() {

    return (
        <FlexibleLayout
            fixedContent={
                <News />
            }
            fixedClassName="bg-white bg-opacity-5 px-4 py-2 w-[350px] hidden lg:block"
        >
            <div className="flex flex-row h-full">
                <CustomTabs
                    defaultValue="forYou"
                    tabs={[
                        {
                            value: "forYou",
                            label: "For You",
                            content: <FeedContent />,
                        },
                        {
                            value: "following",
                            label: "Following",
                            content: <div>Following</div>,
                        },
                        {
                            value: "trending",
                            label: "Trending",
                            content: <div>Trending</div>,
                        },
                    ]}
                />
            </div>
        </FlexibleLayout>
    );
}
