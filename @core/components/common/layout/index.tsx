import { Box, Container, Grid } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import ResponsiveAppBar from '../header';

import LayoutInterface from './interface/layout.interface';



export function Layout({ head, page, children }: LayoutInterface) {

    return (
        <>
            <Head>
                <title>{head}</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Container disableGutters maxWidth={false}>
                <Box sx={{ minHeight: '100vh', p: 0, position: 'relative' }} >
                    <Grid sx={{ position: 'relative' }}>
                        <ResponsiveAppBar active={page} pages={[]}/>
                    </Grid>
                    {children}
                </Box>
                {/* <BottomNavigationCustomize /> */}
            </Container>
        </>
    );
}

