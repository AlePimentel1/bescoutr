import createNextIntlPlugin from 'next-intl/plugin';
import './src/env.js';

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default withNextIntl(config);
