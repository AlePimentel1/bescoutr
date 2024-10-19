import ProfileBasicInfo from "@/components/profile/ProfileBasicInfo";
import FlexibleLayout from "@/components/ui/customs/flexible-layout";

export default function ProfilePage() {
    return (
        <FlexibleLayout
            childrenClassName="p-4"
        >
            <ProfileBasicInfo />
        </FlexibleLayout>
    );
}
