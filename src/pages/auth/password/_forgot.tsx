import { Box, Button, Card, CardContent, Grid, Link, Snackbar, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import BannerImage from '../../../../@core/components/common/coloredBanner';
import { Layout } from '../../../../@core/components/common/layout';
import useTranslation from 'next-translate/useTranslation';
import Logo from '../../../../@core/components/logo';
import { ValidateEmail } from '../../../../@core/utils/validation';
import { useRouter } from 'next/router';

function Forgot() {

    const { t, lang } = useTranslation()
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [form_data, setFormData] = useState({
        email: ""
    });


    const _login = async () => {
        router.push("/auth/login");
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

    const submit = async () => {
        let err = 0;
        if (form_data.email.trim() === "" || !ValidateEmail(form_data.email)) {
            setError({
                email: t('common:email_validation')
            });
        }

        if (err == 0) {
            // let result = await signIn('credentials', {
            //     redirect: false,
            //     ...form_data
            // });
            // if (result?.error) {
            //     setAlert({ color: "danger", message: t('common:danger') });
            // } else {
            //     setAlert({ color: "success", message: t('common:success') });
            //     const redirect = router.query.redirect as string;

            //     router.push(redirect ? redirect : "/");
            // }
        }
    }

    return (
        <Layout page={'forgot'} head={""}>
            <BannerImage>

                <Container sx={{ minHeight: '100vh', overflowY: 'auto' }}>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={alert.message}
                    />
                    <Grid className='main' display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Card sx={{ width: 450, minHeight: 400, height: 'auto', mt: 5, borderRadius: 3 }} elevation={10}>
                            <CardContent sx={{
                                p: 3, minHeight: 400, height: '100%', display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}>
                       
                                <Grid mt={1} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

                                    <Typography
                                        variant='h5'
                                        color={"primary"}
                                        sx={{ fontFamily: "Apis-Medium", textAlign: 'center' }}>
                                        {t('common:reset_password')}
                                    </Typography>

                                    <Grid mt={5}>
                                        <TextField fullWidth
                                            label={t("common:email")}
                                            variant="outlined"
                                            name='email'
                                            onChange={(event) => {
                                                handleChange('email', event.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid mt={2} display={'flex'} justifyContent={"space-between"}>
                                        <Button color='secondary'
                                            size='medium'
                                            onClick={_login}
                                            sx={{
                                                fontFamily: "Apis-Medium",
                                                textTransform: 'capitalize'
                                            }} >
                                            {t("common:signin")}
                                        </Button>
                                        <Button variant='contained' onClick={submit} color='secondary' size='medium' sx={{ color: '#fff' }} >
                                            {t("common:reset")}
                                        </Button>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                </Container>
            </BannerImage>
        </Layout>
    );
}

export default Forgot;