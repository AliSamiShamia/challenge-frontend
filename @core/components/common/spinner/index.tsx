import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import { styled } from '@mui/system';


interface SpinnerInterface {
    width: number | undefined | null,
    height: number | undefined | null,
    loading: boolean | undefined,
    children: ReactNode

}
function SpinnerCustomize({ width, height, loading, children }: SpinnerInterface) {

    const BannerImage = styled('div')({
        height: '100vh',
        backgroundImage: 'radial-gradient(circle, #e7f1fe, #e2effe, #ddedfe, #d8ebfe, #d3e9fe, #cee9ff, #c9e8ff, #c4e8ff, #bde9ff, #b6e9ff, #afeaff, #a8ebfe)'
    });
    return (
        <BannerImage sx={{
            zIndex: 9900, position: 'fixed', width: '100vw', height: '100vh',
            minHeight: 600,
            display: 'flex', justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            {children}

            <PropagateLoader
                color={"#001965"}
                loading={true}
                style={{
                    marginTop: 20
                }}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </BannerImage>

    );
}

export default SpinnerCustomize;