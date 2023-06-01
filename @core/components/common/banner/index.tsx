import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import BannerInterface from './interface/banner.interface';




export function Banner({ setLoading }: BannerInterface) {


    return (
        <>
            <Grid container sx={{
                height: '100%',
                display: { xs: 'flex', md: 'flex' },
                flexDirection: { xs: 'column', md: 'row', lg: 'row' }
            }}>

                <Grid item md={12} lg={12} sm={12} sx={{
                    position: 'relative',
                    height: {
                        md: "100vh",
                    },
                    backgroundImage: `url('/static/images/banner.jpg')`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    flexDirection: 'column',
                    justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' },
                    alignSelf: 'center', display: { xs: 'flex', md: 'flex' }
                }}>
                    <Box sx={{
                        height: "100%",
                        width: "100%",
                        position: 'absolute',
                        zIndex: 1,
                        backgroundColor: "#00000055"

                    }}></Box>
                    <Box sx={{
                        display: 'flex',

                        pl: { sm: 0, md: 2, lg: 10, xl: 20 },
                    }}>
                        <Typography variant="h3" component="h4" color={"secondary"} sx={{
                            textTransform: 'uppercase',
                            pr: 2,
                            fontFamily: `"Apis-Bold", "Helvetica", "Arial", sans-serif`,
                            fontSize: { xs: 35, sm: 40, md: 50, lg: 60 },
                            mb: { xs: 1 }
                        }}>
                            The
                        </Typography>
                        <Typography variant="h3" component="h4" color={"primary"} sx={{
                            textTransform: 'uppercase',
                            pr: 2,
                            fontFamily: `"Apis-Bold", "Helvetica", "Arial", sans-serif`,
                            fontSize: { xs: 35, sm: 40, md: 50, lg: 60 },
                            mb: { xs: 1 }
                        }}>
                            Last
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        pl: { sm: 0, md: 2, lg: 10, xl: 20 },
                    }}>
                        <Typography variant="h3" component="h4" color={"secondary"} sx={{
                            textTransform: 'uppercase',
                            pr: 2,
                            fontFamily: `"Apis-Bold", "Helvetica", "Arial", sans-serif`,
                            fontSize: { xs: 35, sm: 40, md: 50, lg: 60 },
                            mb: { xs: 1 }
                        }}>
                            News
                        </Typography>
                    </Box>
                </Grid>


            </Grid>

        </>
    );
}

