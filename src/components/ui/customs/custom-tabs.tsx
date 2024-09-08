import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

interface CustomTabsProps {
    tabs: {
        value: string;
        label: string;
        content: React.ReactNode;
    }[];
    defaultValue: string;
}

const CustomTabs = ({ tabs, defaultValue }: CustomTabsProps) => {
    return (
        <Tabs defaultValue={defaultValue} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b-2 border-b-white/10 rounded-none p-0">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="text-white px-4 py-2.5 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none transition-bord duration-300 ease-in data-[state=active]:text-white"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default CustomTabs;
