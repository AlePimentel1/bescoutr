import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'es'],
    defaultLocale: 'en',
})

export const config = {
    matcher: [
        '/((?!login|api|signup|activate|_next|_vercel).*)',
    ]
}