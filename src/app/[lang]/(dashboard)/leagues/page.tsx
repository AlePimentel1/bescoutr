import WeeklyChallengeCard from "@/components/home/weekly-challenge/WeeklyChalengeCard";
import LeaguesTable from "@/components/leagues/leagues-table";
import FlexibleLayout from "@/components/ui/customs/flexible-layout";

export default function LeaguesPage() {
    return (
        <FlexibleLayout
            childrenClassName="p-4 flex flex-col h-full gap-8">
            {/* <div className="flex flex-col h-full gap-4"> */}
            <LeaguesTable />
            <WeeklyChallengeCard />
            {/* </div> */}
        </FlexibleLayout>
    );
}
