import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const middleware = createMiddleware({
    locales: ['en', 'es'],
    defaultLocale: 'en',
});

export default function handler(req: NextRequest) {
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    const staticFileExtensions = ['ico', 'png', 'jpg', 'jpeg', 'webp', 'svg'];
    const isStaticFile = staticFileExtensions.some(ext => pathname.endsWith(`.${ext}`));

    if (isStaticFile) {
        return NextResponse.next();
    }

    return middleware(req);
}

export const config = {
    matcher: [
        '/((?!api|activate|_next|_vercel|favicon.ico).*)',
    ],
};
