import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'es'],
    defaultLocale: 'en',
})

export const config = {
    matcher: [
        '/((?!api|activate|_next|_vercel).*)',
    ]
}