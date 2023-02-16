# generate-image-mocks

This utility genertae image mocks with these providers
- https://via.placeholder.com/
- https://picsum.photos/

You need to provide at least a width for each breakpoint (desktop, tablet, mobile) and a default aspect ratio.
You can aswell provide different aspect ratios for each breakpoint and choose from either via.placeholder images with black or white background or fancy images from picsum. See examples

The script always generates a url with 2x width for retina displays

````typescript
export function generateImageMock(
    widths: ImageWidthPerBreakpoint,
    ar: AspectRatioPerBreakpoint,
    bg?: BACKGROUND_TYPES
)
````

Examples
````typescript
const image9x16And1x1FANCY = generateImageMock(
    { lg: 1200, md: 900, sm: 600 },
    { default: { ratioX: 1, ratioY: 1 } },
);

const image9x16And1x1FANCY = generateImageMock(
    { lg: 1200, md: 900, sm: 600 },
    {
        lg: { ratioX: 16, ratioY: 9 },
        md: { ratioX: 16, ratioY: 9 },
        sm: { ratioX: 1, ratioY: 1 },
    },
    'FANCY'
);
````

JSON Ouput
````json
{
    "altText": "alt text",
    "breakpoints": [
        {
            "name": "lg",
            "mediaQuery": "1280",
            "urls": [
                {
                    "size": "1x",
                    "url": "https://via.placeholder.com/1200x2133/ffffff/000000",
                    "width": "1200",
                    "height": "2133"
                },
                {
                    "size": "2x",
                    "url": "https://via.placeholder.com/2400x4266/ffffff/000000",
                    "width": "2400",
                    "height": "4266"
                }
            ]
        },
        {
            "name": "md",
            "mediaQuery": "768",
            "urls": [
                {
                    "size": "1x",
                    "url": "https://via.placeholder.com/900x1600/ffffff/000000",
                    "width": "900",
                    "height": "1600"
                },
                {
                    "size": "2x",
                    "url": "https://via.placeholder.com/1800x3200/ffffff/000000",
                    "width": "1800",
                    "height": "3200"
                }
            ]
        },
        {
            "name": "sm",
            "mediaQuery": "360",
            "urls": [
                {
                    "size": "1x",
                    "url": "https://via.placeholder.com/600x1067/ffffff/000000",
                    "width": "600",
                    "height": "1067"
                },
                {
                    "size": "2x",
                    "url": "https://via.placeholder.com/1200x2134/ffffff/000000",
                    "width": "1200",
                    "height": "2134"
                }
            ]
        }
    ]
}
````
