import { Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface ImageInterface {
    src: string,
    alt: string,
    width: number | undefined | {},
    height: number | undefined | {},
    maxWidth: number | undefined | {},
    minHeight: number | undefined | {},
    maxHeight: number | undefined | {},
    fill: boolean | null,
    sizes: string | undefined,
    priority: boolean | undefined,
    onLoad: () => void
}
function CustomImage({
    src, alt, width, height,
    maxWidth,
    maxHeight,
    minHeight,
    fill, sizes, onLoad
}: ImageInterface) {
    return (
        <Grid
            sx={{
                width: width,
                height: height,
                maxWidth: maxWidth,
                minHeight: minHeight,
                maxHeight: maxHeight,
                position: 'relative'
            }}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Image
                loading="lazy"
                sizes={sizes != "" ? sizes : undefined} src={src}
                onLoad={onLoad} fill alt={alt} />
        </Grid>

    );
}

export default CustomImage;