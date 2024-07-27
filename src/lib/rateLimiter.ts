// lib/rateLimiter.js
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from 'next/server';

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(10, "10 s"), // 10 solicitudes por 10 segundos
    analytics: true,
    prefix: "@upstash/ratelimit",
});

const rateLimiter = async (req: any) => {
    const identifier = 'api'
    const result = await ratelimit.limit(identifier);

    const response = NextResponse.next();

    response.headers.set('X-RateLimit-Limit', result.limit.toString());
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());

    if (!result.success) return null;

    return true;
};

export default rateLimiter;
