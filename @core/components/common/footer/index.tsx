import React from 'react';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
//Custom Component
import Logo from '../../logo';

const CustomGrid = styled('div')(({ theme }) => ({
    padding: 20,
    backgroundColor: theme.palette.primary.main
}));

interface linkInterface {
    title: string,
    url: string
}


const quickLinks = [
    {
        title: "footer:about_us",
        url: "about-us"
    },
    {
        title: "footer:privacy",
        url: "privacy-policy"
    },
    {
        title: "footer:terms",
        url: "terms-conditions"
    },
];
const lists = [
    {
        title: "footer:resources",
        url: "resources"
    },
    {
        title: "footer:courses",
        url: "courses"
    },
    {
        title: "footer:webinars",
        url: "webinars"
    },
];

function index() {


    const renderList = (list: linkInterface[]) => {
        return list.map((item: linkInterface, key: number) => {
            return <Grid key={key} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <IconButton>
                    <Typography
                        sx={{
                            fontFamily: `"Apis-Bold", "Helvetica", "Arial", sans-serif`,
                            textAlign: 'center',
                            width: "100%"
                        }}
                        pl={2} variant='h6' color={'white'}>{(item.title)}</Typography>
                </IconButton>
            </Grid>

        })

    }

    return (
        <CustomGrid>
            <Container maxWidth={'xl'}>

                <Grid container sx={{ mt: 5, mb: 20 }} spacing={2}>
                    <Grid item md={4} xs={12} >
                        <Grid sx={{ position: 'relative', clear: 'both', mb: 4 }} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Logo
                                name={'white'}
                                onClick={() => {
                                }} active={'home'} width={200} height={50} />
                        </Grid>
  
                    </Grid>
                    <Grid item lg={2} md={3} xs={12} sm={12}>
               

                    </Grid>
                    <Grid item lg={2} md={3} xs={12} sm={12}>
                       
                    </Grid>
                    <Grid item md={4} xs={12} sm={12}>

                    </Grid>
                </Grid>
            </Container>

        </CustomGrid>
    );
}

export default index;