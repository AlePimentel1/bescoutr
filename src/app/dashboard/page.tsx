'use client'
import { Button } from '@/components/ui/button';
import useSocket from '@/hooks/useSocket';
import { useSession } from 'next-auth/react'
import posthog from 'posthog-js';
import React, { useState } from 'react'

export default function page() {
    return (
        <div>
            <h1>Next.js with Socket.IO</h1>
        </div>
    );
}
