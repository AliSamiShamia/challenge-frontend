import { AppBar, Button, Container, Divider, Fade, Grid, Grow, IconButton, Menu, MenuItem, Toolbar, Typography, Zoom } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import Logo from '../logo';

import ClassIcon from '@mui/icons-material/Class';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Logout from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';


interface PageInterface {
    title: string,
    url: string
}
interface HeaderInterface {
    active: string,
}


function ResponsiveAppBar({ active }: HeaderInterface) {


    const router = useRouter();
    const { data: session, status } = useSession();

    const [stickyClass, setStickyClass] = useState(false);
    const [navClass, setNavClass] = useState(true);


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);


    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl1(null);
        setAnchorEl(null);

    };


    useEffect(() => {
        window?.addEventListener('scroll', stickNavbar);

        return () => {
            window?.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 100 ? setStickyClass(true) : setStickyClass(false);
        }
    };

    const handleMenu = (event: any, key: number) => {

        switch (key) {
            case 1:
                setAnchorEl(event.currentTarget);
                break;
            case 2:
                setAnchorEl1(event.currentTarget);
                break;
            case 3:
                break;
        }
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logout = async () => {
        await signOut();
    }



    return (
        <AppBar id={"appBar"} sx={{ backgroundColor: { xs: 'white', sm: 'white', md: 'transparent' } }} elevation={0} enableColorOnDark>
            <Container maxWidth={stickyClass ? false : 'xl'} disableGutters>
                <Zoom in={!stickyClass || navClass} style={{ transitionDelay: stickyClass ? '500ms' : '0ms' }}>

                    <Toolbar
                        component="nav"
                        variant="dense"
                        sx={{
                            p: 2,
                            minHeight: { md: 90 },
                            borderRadius: { md: stickyClass ? 0 : 5 },
                            justifyContent: 'space-between', overflowX: 'auto',
                            border: 1, borderColor: 'divider',
                            background: stickyClass ? 'radial-gradient(circle, #e7f1feee, #e2effeee, #ddedfeee, #d8ebfeee, #d3e9feee, #cee9ffee, #c9e8ffee, #c4e8ffee, #bde9ffee, #b6e9ffee, #afeaffee, #a8ebfeee)' : 'transparent',

                        }}
                    >
                        <Box sx={{
                            display: { xs: 'none', md: 'flex', },
                        }}>
                            <Logo
                                name={'dark'}
                                onClick={() => {
                                    router.push('/');
                                }} active={active} width={200} height={50} />
                        </Box>
                        <Box sx={{
                            display: { xs: 'flex', md: 'none', },
                        }}>
                            <Logo
                                name={'dark'}
                                onClick={() => {
                                    router.push('/');
                                }} active={active} width={200} height={50} />
                        </Box>

                      
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', }}>
                            {session?.user ? (<>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="avatar"
                                    aria-haspopup="true"
                                    onClick={(event) => {
                                        handleMenu(event, 1)
                                    }}
                                >
                                    <AccountCircle sx={{ fontSize: 30, mr: 1 }} color='secondary'/>
                                    <Typography color={'secondary'}>
                                        Hi {session?.user?.first_name}
                                    </Typography>
                                </IconButton>

                                <Menu
                                    id="avatar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={() => { handleClose() }}
                                >
                                    <MenuItem onClick={() => { }}>
                                        <AccountCircle sx={{ fontSize: 20, mr: 1 }} />
                                        Profile
                                    </MenuItem>
                                    <Divider />

                                    <MenuItem onClick={() => { 
                                         router.push('/preference');
                                    }}>
                                        <FavoriteIcon sx={{ fontSize: 20, mr: 1 }} />
                                        Preference
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={logout}>
                                        <Logout sx={{ fontSize: 20, mr: 1 }} />
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>) : (<>
                                <Button onClick={() => { router.push('/auth/login') }} sx={{ mr: 1, borderRadius: 2, pr: 3, pl: 3, textTransform: 'capitalize' }} size={'medium'} variant={'outlined'} color={'primary'}>
                                    SignIn
                                </Button>
                                <Button onClick={() => { router.push('/auth/register') }} sx={{ borderRadius: 2, pr: 3, pl: 3, backgroundColor: 'white', borderColor: 'default', textTransform: 'capitalize' }} size={'medium'} variant={'outlined'} color={'primary'}>
                                    SignUp
                                </Button>
                            </>)}

                        </Box>
                    </Toolbar>
                </Zoom>
            </Container>

        </AppBar >
    );
}
ResponsiveAppBar.propTypes = {
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
};
export default ResponsiveAppBar;