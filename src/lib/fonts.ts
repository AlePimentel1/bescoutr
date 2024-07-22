import localFont from 'next/font/local';

export const brockmann = localFont({
    src: [{
        path: '../../public/fonts/brockmann-regular.ttf',
        weight: '400',
        style: 'normal'
    }, {
        path: '../../public/fonts/brockmann-medium.ttf',
        weight: '500',
        style: 'normal'
    }, {
        path: '../../public/fonts/brockmann-semibold.ttf',
        weight: '600',
        style: 'normal'
    }, {
        path: '../../public/fonts/brockmann-bold.ttf',
        weight: '700',
        style: 'normal'
    }],
})