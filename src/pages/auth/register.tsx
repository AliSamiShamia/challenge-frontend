import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import BannerImage from '../../../@core/components/common/coloredBanner';
import { Layout } from '../../../@core/components/common/layout';
import authConfig from '../../../@core/config/auth'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/router';
import { get, post } from '../../../handler';
import ItemSpinner from '../../../@core/components/common/itemSpinner';
import Logo from '../../../@core/components/logo';
import { object, string, number, date, InferType, ref } from 'yup';


let userSchema = object({
    first_name: string().required('First Name is required'),
    last_name: string().required('Last Name is required'),
    email: string().email('Email is required'),
    password: string().required('Password is required'),
    confirm_password: string()
        .oneOf([ref('password')], 'Passwords must match'),
});
function Register() {


    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [submit_loading, setSubmitLoading] = useState(false);
    type User = InferType<typeof userSchema>;

    const [form_data, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",

    });

    useEffect(() => {

    }, [])


    const handleChange = (key: string, value: any) => {

        setFormData({
            ...form_data,
            [key]: value
        })
    }
    const validate = async () => {
        try {
            const parsedUser = await userSchema.validate(
                form_data,
                { strict: true },
            );
            return parsedUser;
        } catch (e) {
            toast(e.errors.toString())
            console.log(e.errors)
            return false
        }
    }

    const submit = async () => {
        try {
            setSubmitLoading(true)
            let data = await validate();
            if (data) {
                console.log(data);
                let res = await post(authConfig.registerEndpoint, data, null);
                if (res && res.status_code == 200) {
                    setSubmitLoading(false);
                } else {
                    toast("Error in request")
                }
            }
            setSubmitLoading(false)
        } catch (error) {
            toast("Error in request")
            setSubmitLoading(false);

        }
    }

    const login = async () => {

        router.push("/auth/login");
    }




    return (
        <>
            <Layout page={"register"} head={"register"}>
                <BannerImage
                    sx={{
                        pb: 6,
                        minHeight: { xl: "100%", md: "100%", xs: "100%" },
                    }}
                >
                    <Container sx={{}}>
                        <Grid className='main' display={'flex'} justifyContent={'center'}>
                            <Card sx={{ width: "100%", maxWidth: 700, minHeight: 500, height: '100%', mt: 5, borderRadius: 3 }} elevation={10}>
                                <CardContent sx={{ p: 3 }}>
                                    <Grid display={"flex"} mb={3} justifyContent={"center"} alignItems={"center"}>
                                        <Logo active={'login'} height={60} width={250} onClick={() => { }} name={''} />
                                    </Grid>
                                    <Typography
                                        variant='h4'
                                        color={"primary"}
                                        sx={{ fontFamily: "Apis-Bold", textAlign: 'center' }}>
                                        Sign up
                                    </Typography>
                                    <Grid mt={5}>
                                        <TextField fullWidth
                                            label={"first_name"}
                                            variant="outlined"
                                            name='first_name'
                                            onChange={(event: any) => {
                                                handleChange('first_name', event.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid mt={2}>
                                        <TextField fullWidth
                                            label={"last_name"}
                                            variant="outlined"
                                            name='last_name'
                                            onChange={(event: any) => {
                                                handleChange('last_name', event.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid mt={2}>
                                        <TextField fullWidth
                                            label={"email"}
                                            variant="outlined"
                                            name='email'
                                            type='email'
                                            onChange={(event: any) => {
                                                handleChange('email', event.target.value);
                                            }}
                                        />
                                    </Grid>

                                    <Grid mt={2}>
                                        <TextField type={'password'}
                                            fullWidth
                                            label={"password"}
                                            variant="outlined"
                                            onChange={(event: any) => {
                                                handleChange('password', event.target.value);
                                            }} />
                                    </Grid>
                                    <Grid mt={2}>
                                        <TextField type={'password'}
                                            fullWidth
                                            label={"Confirm Password"}
                                            variant="outlined"
                                            onChange={(event: any) => {
                                                handleChange('confirm_password', event.target.value);
                                            }} />
                                    </Grid>
                                    <Grid mt={2} display={'flex'} justifyContent={"space-between"}>

                                        {submit_loading ? (<>
                                            <Grid sx={{ height: "100%" }} display={'flex'} justifyContent={"center"} alignItems={"center"}>
                                                <ItemSpinner loading={submit_loading} />
                                            </Grid>
                                        </>) : (
                                            <>
                                                <Typography
                                                    variant='body1'
                                                    color={"#6c757d"}
                                                    sx={{ fontFamily: "Apis-Medium", }}>
                                                    Already have account

                                                    <Button size='medium' onClick={login}
                                                        sx={{ fontFamily: "Apis-Bold", textTransform: 'capitalize' }} >
                                                        sign in
                                                    </Button>
                                                </Typography>
                                                <Button variant='contained' onClick={submit} color='secondary' size='medium' sx={{ color: 'white' }} >
                                                    register
                                                </Button>
                                            </>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Container>
                </BannerImage>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Layout>
        </>
    );
}

export default Register;

function useEffectLayout(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}
