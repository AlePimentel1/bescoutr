'use client'
import { Button } from "../ui/button";

export default function CreateReportButton() {
    return (
        <Button className="w-full h-[50px]" onClick={() => console.log('holaa')}>
            Create new report
        </Button>
    )
}
