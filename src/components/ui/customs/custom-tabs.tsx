import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

interface CustomTabsProps {
    tabs: {
        value: string;
        label: string;
        content: React.ReactNode;
    }[];
    defaultValue: string;
    tabsListClassName?: string;
    tabsTriggerClassName?: string;
    childrenBeforeContent?: React.ReactNode;
    tabClassName?: string
    tabsContentClassName?: string
}

const CustomTabs = ({ tabs, defaultValue, tabsListClassName, tabsTriggerClassName, childrenBeforeContent, tabClassName, tabsContentClassName }: CustomTabsProps) => {
    return (
        <Tabs defaultValue={defaultValue} className={cn('w-full', tabClassName)}>
            <TabsList className={cn("w-full justify-start bg-transparent border-b-2 border-b-white/10 rounded-none p-0", tabsListClassName)}>
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={cn("text-white px-4 py-2.5 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none transition-bord duration-300 ease-in data-[state=active]:text-white", tabsTriggerClassName)}
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {childrenBeforeContent}
            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className={tabsContentClassName}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default CustomTabs;
