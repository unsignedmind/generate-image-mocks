interface Image {
    size: '1x' | '2x';
    url: string;
    width: string;
    height: string;
}

interface ImageBreakpoint {
    name: string;
    mediaQuery: string;
    urls: Array<Image>;
}

interface ImageSettings {
    altText: string;
    breakpoints: Array<ImageBreakpoint>;
}


interface AspectRatio {
    ratioX: number;
    ratioY: number;
}

interface AspectRatioPerBreakpoint {
    default?: AspectRatio;
    lg?: AspectRatio;
    md?: AspectRatio;
    sm?: AspectRatio;
}

interface ImageWidthPerBreakpoint {
    lg: number;
    md: number;
    sm: number;
}

interface ImageSizes {
    oneX: {
        width: number;
        height: number;
    };
    twoX: {
        width: number;
        height: number;
    };
}

type BACKGROUND_TYPES = 'WHITE' | 'BLACK' | 'FANCY';

export function generateImageMock(
    widths: ImageWidthPerBreakpoint,
    ar: AspectRatioPerBreakpoint,
    bg?: BACKGROUND_TYPES
): ImageSettings {
    const imageSizes: Array<ImageSizes> = [];

    Object.values(widths).forEach((width, index) => {
        let ratioX = 1;
        let ratioY = 1;

        if (ar.default) {
            ratioX = ar.default.ratioX;
            ratioY = ar.default.ratioY;
        } else if (!ar.default) {
            const breakpoint = Object.keys(widths)[index];
            ratioX = ar[breakpoint].ratioX;
            ratioY = ar[breakpoint].ratioY;
        }

        const ratio = width / ratioX;
        const height = Math.round(ratio * ratioY);

        imageSizes.push({
            oneX: {
                width: width,
                height: height,
            },
            twoX: {
                width: width * 2,
                height: height * 2,
            },
        });
    });

    function urlBuilder(width: number, height: number, bg = 'WHITE') {
        const colorScheme = { WHITE: 'ffffff/000000', BLACK: '000000/ffffff' };
        if (bg === 'FANCY') {
            return `https://picsum.photos/${width}/${height}`;
        } else {
            return `https://via.placeholder.com/${width}x${height}/${colorScheme[bg]}`;
        }
    }

    /* ### generate output structure ###  */

    const DESKTOP_BREAKPOINT = '1280';
    const TABLET_BREAKPOINT = '768';
    const MOBILE_BREAKPOINT = '360';

    const imageMock: ImageSettings = {
        altText: 'alt text',
        breakpoints: [
            genBreakpoint('lg', DESKTOP_BREAKPOINT, imageSizes[0], bg),
            genBreakpoint('md', TABLET_BREAKPOINT, imageSizes[1], bg),
            genBreakpoint('sm', MOBILE_BREAKPOINT, imageSizes[2], bg),
        ],
    };

    function genBreakpoint(
        name: string,
        mediaQuery: string,
        imageSize: ImageSizes,
        bg?: BACKGROUND_TYPES
    ): ImageBreakpoint {
        return {
            name: name,
            mediaQuery: mediaQuery,
            urls: [
                {
                    size: '1x',
                    url: urlBuilder(imageSize.oneX.width, imageSize.oneX.height, bg),
                    width: `${imageSize.oneX.width}`,
                    height: `${imageSize.oneX.height}`,
                },
                {
                    size: '2x',
                    url: urlBuilder(imageSize.twoX.width, imageSize.twoX.height, bg),
                    width: `${imageSize.twoX.width}`,
                    height: `${imageSize.twoX.height}`,
                },
            ],
        };
    }

    return imageMock;
}
