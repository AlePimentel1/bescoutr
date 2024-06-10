'use client'
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react'
import posthog from 'posthog-js';
import React from 'react'

export default function page() {
    const { data, status } = useSession();

    return (
        <>
            <div>
                DashboardPage {JSON.stringify(status)}
            </div>
        </>

    )
}
