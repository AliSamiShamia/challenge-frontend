import { Box, Button, Card, CardContent, Grid, Link, Snackbar, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import BannerImage from '../../../@core/components/common/coloredBanner';
import { Layout } from '../../../@core/components/common/layout';
import Logo from '../../../@core/components/logo';
import { signIn } from 'next-auth/react';
import { ValidateEmail } from '../../../@core/utils/validation';
import { useRouter } from 'next/router';
import ItemSpinner from '../../../@core/components/common/itemSpinner';

function Login() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [form_data, setFormData] = useState({
        email: "",
        password: ""
    });


    const _register = async () => {

        router.push("/auth/register");
    }

    const _forgot = async () => {

        router.push("/auth/password/_forgot");
    }


    const [alert, setAlert] = useState({
        color: "",
        message: ""
    });
    const [error, setError] = useState({});
    const [open, setOpen] = useState(false);

    const handleChange = (key: string, value: any) => {
        setFormData({
            ...form_data,
            [key]: value
        })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const login = async () => {
        setLoading(true);
        let err = 0;
        if (form_data.email.trim() === "" || !ValidateEmail(form_data.email)) {
            setError({
                email: "check the email"
            });
            setLoading(false);
        }
        if (form_data.password.trim() === "") {
            setError({
                password: "Password is required"
            });
            setLoading(false);
        }
        if (err == 0) {
            let result = await signIn('credentials', {
                redirect: false,
                ...form_data
            });
            setLoading(false);
            if (result?.error) {
                setAlert({ color: "danger", message: "Error in request" });
            } else {
                setAlert({ color: "success", message: "success" });
                const redirect = router.query.redirect as string;
                router.push(redirect ? redirect : "/");
            }
        }
    }

    return (
        <Layout page={'login'} head={"Login"}>
            <BannerImage>

                <Container sx={{ minHeight: '100vh', overflowY: 'auto' }}>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={alert.message}
                    />
                    <Grid className='main' display={'flex'} justifyContent={'center'}>
                        <Card sx={{ width: 450, minHeight: 300, height: 'auto', mt: 5, borderRadius: 3 }} elevation={10}>
                            <CardContent sx={{ p: 3 }}>
                                <Grid display={"flex"} mb={3} justifyContent={"center"} alignItems={"center"}>
                                    <Logo active={'login'} height={60} width={250} onClick={() => { }} name={''} />
                                </Grid>
                                <Typography
                                    variant='h4'
                                    color={"primary"}
                                    sx={{ fontFamily: "Apis-Bold", textAlign: 'center' }}>
                                    Sign In
                                </Typography>

                                <Grid mt={5}>
                                    <TextField fullWidth
                                        label={"email"}
                                        variant="outlined"
                                        name='email'
                                        onChange={(event) => {
                                            handleChange('email', event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <TextField type={'password'}
                                        fullWidth
                                        label={"password"}
                                        variant="outlined"
                                        onChange={(event) => {
                                            handleChange('password', event.target.value);
                                        }} />
                                </Grid>

                                <Grid mt={1} display={'flex'} justifyContent={"space-between"}>
                                    <Button color='secondary'
                                        size='medium'
                                        onClick={_register}
                                        sx={{
                                            fontFamily: "Apis-Medium",
                                            textTransform: 'capitalize'
                                        }} >
                                        Create one
                                    </Button>
                                    {loading ? (<>
                                        <ItemSpinner loading={loading} />
                                    </>) : (
                                        <>
                                            <Button variant='contained' onClick={login} color='secondary' size='medium' sx={{}} >
                                                login
                                            </Button>
                                        </>)
                                    }
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                </Container>
            </BannerImage>
        </Layout>
    );
}

export default Login;